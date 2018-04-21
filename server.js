const path = require('path')
const server = require('./lib/main')

const options = {
	watch: false,
	watchStatic: path.join(__dirname, './demo/'),
	serverStatic: path.join(__dirname, './'),
	port: 8008,
	proxyTable: {
		'/api': { target: 'http://doman.com/', }
	},
	
}

server(options)