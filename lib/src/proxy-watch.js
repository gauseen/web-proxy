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

	// add watch *.css
	browserSync.watch(`${watchPath}/**/*.css`).on("change", () => {
		browserSync.reload('*.css')
		// browserSync.notify("Compiling, please wait!")
	})

	// add watch *.html
	browserSync.watch(`${watchPath}/**/*.html`).on("change", () => {
		browserSync.reload('*.html')
	})

	// add watch *.js
	browserSync.watch(`${watchPath}/**/*.js`).on("change", () => {
		browserSync.reload('*.js')
	})

	// Add the proxy to browser-sync
	browserSync.init({
		server: {
			baseDir: options.serverStatic,
			middleware: middlewareProxys
		},
		port: options.port,
		open: false,
		reloadThrottle: 150,
	})

}
