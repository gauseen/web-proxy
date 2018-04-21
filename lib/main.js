const path = require('path')

// const argvs = process.argv && process.argv.slice(2)
// const isWatching = argvs.indexOf('--watch') !== -1

// console.log(isWatching, argvs[0])

const defaultOptions = {
	watch: false,
	watchStatic: '',
	serverStatic: '',
	port: 8008,
	proxyTable: {},
}

module.exports = function (options) {
	const config = Object.assign({}, defaultOptions, options)

	if (!config.serverStatic) {
		console.error('Error: serverStatic connot be empty !!!')
		return
	}

	const isWatching = config.watch

	// console.log('config======: ', config)

	if (isWatching) {
		require('./src/proxy-watch')(config)
	} else {
		require('./src/proxy-unwatch')(config)
	}
}