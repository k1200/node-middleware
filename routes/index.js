const router = require('koa-router')()
const handleRouter = (conf) => {
	const r = router[conf.methond]
	r(conf['url'], async (ctx, next) => {})
}
class KmlRouter {
	constructor() {}
	async enter(ctx, next) {}
	async out(ctx, next) {}
}

module.exports = koaRouter
