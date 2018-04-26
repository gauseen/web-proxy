const express = require('express')
const Proxy = require('http-proxy-middleware')

const createProxy = require('./create-proxy')

const app = express()

module.exports = function (options) {
	
	app.use(express.static(options.serverStatic))

	// 生成 http proxy 中间件
	const proxys = createProxy(options)

	// 注册中间件
	proxys.forEach(item => {
		const middlewareProxy = Proxy.apply(null, item)
		app.use(item[0], middlewareProxy)
	})

	app.listen(options.port, options.callback)
}