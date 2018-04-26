const shell = require('shelljs')

shell.rm('-rf', 'publish/')
shell.mkdir('publish')
shell.cp('-R', ['lib/', './package.json', './yarn.lock', './README.md'], 'publish/')