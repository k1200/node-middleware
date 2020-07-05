const RouterClass = require(`${__dirname}/Router.class`)
const { getConf } = require(`${process.cwd()}/conf`)

const enter: (ctx: any, next: any) => any = (ctx, next) => {
	const appConf = getConf()
	const appDir = `${process.cwd()}/webapp/${appConf.env.argv.webapp}/api`
	const path = ctx.path
	const currentModel = `${appDir}${path}`
	let currentApi = null
	try {
		currentApi = require(currentModel)
	} catch (e) {
		ctx.status = 404
		ctx.body = {
			code: 404,
			data: null,
			message: `${e}`.replace(appDir, ''),
		}
		return false
	}
	ctx['$conf'] = {
		...appConf,
		...currentApi(ctx.query, ctx.req.body),
	}
	next()
}
exports = module.exports = enter
