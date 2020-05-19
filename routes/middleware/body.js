const middleware = (ctx, next) => {
	// TODO
	ctx.body = {
		status: 1,
		msg: '操作成功',
		data: { name: (ctx.params && ctx.params.name) || '匡明亮' },
	}
	ctx.status = 200
	next()
}
module.exports = middleware
