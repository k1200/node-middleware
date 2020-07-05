const http = require('http')
const https = require('https')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const { initConf } = require(`${process.cwd()}/conf`)
const { parseParams } = require(`${process.cwd()}/until/util`)
const ENTER = require(`${process.cwd()}/server/routers/enter`)
const HEADER = require(`${process.cwd()}/server/routers/header`)
let app = new Koa()
app.use(bodyParser())
const argv = process.argv.slice(2)
initConf(app, { argv: parseParams(argv) }, 'env')
app.use(ENTER)
app.use(HEADER)

app.use(async (ctx) => {
	ctx.type = 'application/json'
	ctx.body = JSON.stringify({
		path: ctx.path,
		href: ctx.href,
		url: ctx.url,
		originalUrl: ctx.originalUrl,
		origin: ctx.origin,
		querystring: ctx.querystring,
		search: ctx.search,
		query: ctx.query,
	})
})
http.createServer(app.callback()).listen(1200)
https.createServer(app.callback()).listen(1201)
