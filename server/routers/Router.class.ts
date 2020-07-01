const router = require('koa-router')()
const handleRouter = (conf: any) => {
	const r = router[conf.methond]
	r(conf['url'], async (ctx: any, next: Function) => {})
}
class KmlRouter {
	id: string
	app: any
	ctx: any
	req: any
	res: any
	enter: Function
	out: Function
	appConf: object
	constructor(ctx: any, next: any, appConf: any, api: any) {
		this.id = api.id
		this.ctx = ctx
		this.req = ctx.req
		this.res = ctx.res
		this.appConf = appConf
		this.enter = function () {
			// this._enter().
		}
		this.out = function () {}
	}
	emit() {
		this.ctx.type = 'application/json'
		this.ctx.body = JSON.stringify({
			...this.appConf,
			path: this.ctx.path,
			href: this.ctx.href,
			url: this.ctx.url,
			originalUrl: this.ctx.originalUrl,
			origin: this.ctx.origin,
			querystring: this.ctx.querystring,
			search: this.ctx.search,
			query: this.ctx.query,
		})
	}
	private async _enter(ctx: any, next: Function) {
		return app
	}
	private async _out(ctx: any, next: Function) {}
	async get(ctx: any, next: Function) {}
	async post(ctx: any, next: Function) {}
	async put(ctx: any, next: Function) {}
}

module.exports = KmlRouter
