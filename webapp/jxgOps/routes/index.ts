const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const APIDIR = "api" 
const files = fs.readdirSync(`${__dirname}/${APIDIR}`)
files
	.filter(file => ~file.search(/^[^\.].*\.ts$/))
	.forEach(file => {
		const file_name = file.substr(0, file.length - 3);
        const file_entity = require(path.join(__dirname, APIDIR, file));
        
		router.use(`/${file_name}`, file_entity.routes(), file_entity.allowedMethods())
	})

module.exports = router