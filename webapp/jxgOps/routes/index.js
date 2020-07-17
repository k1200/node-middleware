const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const APIDIR = "api" 
const files = fs.readdirSync(`${__dirname}/${APIDIR}`)
files
	.filter(file => ~file.search(/^[^\.].*\.ts$/))
	.forEach(file => {
		const file_name = file.substr(0, file.length - 3);
		// const file_entity = require(path.join(__dirname, APIDIR, file))
		const file_router = require(path.join(__dirname, APIDIR, file));
		let api_router = null;
		file_router.forEach((R, index) => {
			const instantiaApi = new R()
			instantiaApi.trigger()
			console.log(instantiaApi.conf)
			index === file_router.length - 1 && (api_router = instantiaApi.router)
		});
		console.log(api_router)
		router.use(`/${file_name}`, api_router.routes(), api_router.allowedMethods())
	})

module.exports = router