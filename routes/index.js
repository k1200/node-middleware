const koaRouter = require('koa-router')()
koaRouter.get('/index/:name?', async (ctx, next) => {
	ctx.type = 'application/json'
	ctx.body = {
		status: 'succsess',
		msg: '操作成功',
		data: { name: (ctx.params && ctx.params.name) || '匡明亮' },
	}
	console.log(9999999999)
})

module.exports = koaRouter
