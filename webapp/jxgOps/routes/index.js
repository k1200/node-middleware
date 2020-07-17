const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const APIDIR = "api" 
const files = fs.readdirSync(`${__dirname}/${APIDIR}`)
files
	.filter(file => ~file.search(/^[^\.].*\.js$/))
	.forEach(file => {
		const file_name = file.substr(0, file.length - 3);
		const file_router = require(path.join(__dirname, APIDIR, file));
		let api_router = null;
		file_router.forEach((R, index) => {
			let [url, name] = ['/', R.name.toLocaleLowerCase()]
			name !== "_" && (url +=  name)
			const instantiaApi = new R(url)
			index === file_router.length - 1 && (api_router = instantiaApi.router)
		});
		router.use(`/${file_name}`, api_router.routes(), api_router.allowedMethods())
	})
module.exports = router