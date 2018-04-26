const browserSync = require('browser-sync').create()
const Proxy = require('http-proxy-middleware')

const createProxy = require('./create-proxy')

module.exports = function (options) {
	// 生成 http proxy 中间件
	const proxys = createProxy(options)
	// watch path
	const watchPath = options.watchStatic ||  options.serverStatic

	// 注册中间件
	const middlewareProxys = proxys.map(item => {
		return Proxy.apply(null, item)
	})

	// 默认 watch 文件类型
	const defaultIncludeTypes = ['css', 'html', 'js']

	// 当前 watch 文件类型
	let currentIncludeTypes = []

	// 根据 ignores 获取，当前 watch 文件类型
	if (options.ignores) {
		currentIncludeTypes = defaultIncludeTypes.filter((item, index) => {
			return options.ignores.indexOf(item) === -1
		})
	} else {
		currentIncludeTypes = defaultIncludeTypes
	}

	// add watch file type
	currentIncludeTypes.forEach((item, index) => {
		browserSync.watch(`${watchPath}/**/*.${item}`).on("change", () => {
			browserSync.reload(`*.${item}`)
			browserSync.notify("Compiling, please wait.")
		})
	})

	// Add the proxy to browser-sync
	browserSync.init({
		server: {
			baseDir: options.serverStatic,
			middleware: middlewareProxys
		},
		port: options.port,
		open: false,
		notify: options.notify === true,
		reloadThrottle: 150,

	}, options.callback)

	if(currentIncludeTypes.length) {
		console.log('Current watching file type: ', currentIncludeTypes.join(', '))
	}
}
