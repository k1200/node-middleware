const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
	ctx.body = 'Wise Wrong'
})

app.listen(3000)
