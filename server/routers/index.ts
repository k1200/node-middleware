const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const handleRouter = (conf: any) => {
	const r = router[conf.methond]
	r(conf['url'], async (ctx: any, next: Function) => {})
}
class KmlRouter {
	constructor() {}
	async enter(ctx: any, next: Function) {}
	async out(ctx: any, next: Function) {}
	async get(ctx: any, next: Function) {}
	async post(ctx: any, next: Function) {}
	async put(ctx: any, next: Function) {}
}

module.exports = KmlRouter
