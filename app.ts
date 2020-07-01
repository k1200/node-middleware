const http = require('http')
const https = require('https')
const Koa = require('koa')
const { initConf, setConf } = require(`${process.cwd()}/conf`)
const { parseParams } = require(`${process.cwd()}/until/util`)
const ENTER = require(`${process.cwd()}/server/routers/enter`)

const argv = process.argv.slice(2)
initConf({ argv: parseParams(argv) }, 'env')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
// const resloveRouter = require('./server/routers')

// const router = require('./routes/index')
// const router = require('./routes/middleware/compose')
app.use(bodyParser())
// app.use(router)
// app.use(resloveRouter)
// app.use(async (ctx) => {
// 	ctx.req.type = 'application/json'
// 	ctx.body = JSON.stringify(getConf())
// })
function a() {
	let [a, b] = [1, 2]
}
app.use(ENTER)
// app.listen(3000)
http.createServer(app.callback()).listen(1200)
https.createServer(app.callback()).listen(1201)
