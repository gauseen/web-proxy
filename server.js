const path = require('path')
const server = require('./lib/main')

const options = {
	watch: true,
	watchStatic: path.join(__dirname, './demo/'),
	serverStatic: path.join(__dirname, './'),
	port: 8008,
	notify: true,
	ignores: ['js'],
	proxyTable: {
		'/api': { target: 'http://doman.com/', }
	},
	callback: function () {
		console.log('server run success ...')
	},
	
}

server(options)