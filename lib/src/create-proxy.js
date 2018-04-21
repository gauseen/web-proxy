module.exports = function (proxyOptions = {}) {
	const proxyTable = proxyOptions.proxyTable
	const proxys = []

	if (!proxyTable) {
		console.log('proxyTable options cannot be empty !')
		return
	}

	const defaultConfig = Object.assign({}, {
		target: '',
		changeOrigin: true,
		// proxy websockets
		ws: false,
	})

	const getConfigs = (o) => Object.assign({}, defaultConfig, o)

	Object.keys(proxyTable).forEach(context => {
		proxys.push([
			context,
			getConfigs(proxyTable[context])
		])
	})

	return proxys
}
