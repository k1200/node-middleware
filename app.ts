const http = require('http')
const https = require('https')
const Koa = require('koa')
import { initConf, getConf, setConf } from './conf'
import { parseParams } from './until/util'

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
app.use(async (ctx) => {
	ctx.req.type = 'application/json'
	ctx.body = JSON.stringify(getConf())
})

// app.listen(3000)
http.createServer(app.callback()).listen(3000)
https.createServer(app.callback()).listen(3001)
