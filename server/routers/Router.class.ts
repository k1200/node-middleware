const router = require('koa-router')()
import { getConf } from './../../conf'

const handleRouter = (conf: any) => {
	const r = router[conf.methond]
	r(conf['url'], async (ctx: any, next: Function) => {})
}
class KmlRouter {
	enter: Function
	out: Function
	conf: object = getConf()
	constructor(conf: Function, enter: Function, out: Function) {
		this.conf = conf
		this.enter = function () {
			// this._enter().
		}
		this.out = out
	}
	private async _enter(app: any, ctx: any, next: Function) {
		return app
	}
	private async _out(ctx: any, next: Function) {}
	async get(ctx: any, next: Function) {}
	async post(ctx: any, next: Function) {}
	async put(ctx: any, next: Function) {}
}

module.exports = KmlRouter
