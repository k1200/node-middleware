const http = require('http')
const https = require('https')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const { initConf } = require(`${process.cwd()}/conf`)
const { parseParams } = require(`${process.cwd()}/until/util`)
const ENTER = require(`${process.cwd()}/server/routers/enter`)
const HEADER = require(`${process.cwd()}/server/routers/header`)
let argv = process.argv.slice(2)
argv = parseParams(argv)
let app = new Koa()
const {webapp} = argv
const ROUTES = require(`${process.cwd()}/webapp/${webapp}/routes/index`)
app.use(bodyParser())
initConf(app, { argv }, 'env')

app.use(ENTER)
app.use(HEADER)
app.use(ROUTES.routes(),  ROUTES.allowedMethods())

http.createServer(app.callback()).listen(1200)
https.createServer(app.callback()).listen(1201)
