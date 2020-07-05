const Router = require('koa-router')()
const Header = require(`${__dirname}/header`)
const handleRouter = (conf: any) => {
	const r = Router[conf.methond]
	r(conf['url'], async (ctx: any, next: Function) => {})
}

class KmlRouter {
	id: string
	app: any
	ctx: any
	next: any
	req: any
	res: any
	httpConf: any
	enter: Function
	outer: Function
	out: Function
	appConf: object
	constructor(app: any, ctx: any, next: any, appConf: any, api: any) {
		this.id = api.id
		this.httpConf = api.httpConf
		this.enter = api.enter.bind(this)
		this.outer = api.outer.bind(this)

		this.app = app
		this.ctx = ctx
		this.next = next
		this.req = ctx.req
		this.res = ctx.res
		this.appConf = appConf
	}
	emit() {
		this.app.use(this._setHeader())
		this._enter()
	}
	private async _enter() {
		// 1 跨域 请求头处理
		// this._setHeader()
		// 2 授权
		/** **/
		// 3 参数处理

		//
		this._outer()
	}
	private _setHeader() {
		let conf = {
			'allow-headers':
				this.httpConf['allow-headers'] || this.appConf['allow-headers'],
			'max-age': this.httpConf['max-age'] || this.appConf['max-age'],
		}
		return () => Header(this.ctx, this.next, conf)
	}
	private async _outer() {
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
			header: this.ctx.header,
			'Access-Control-Allow-Headers': this.ctx.get(
				'Access-Control-Allow-Headers'
			),
		})
	}
}

module.exports = KmlRouter
