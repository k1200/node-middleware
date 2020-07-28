const http = require('http')
const https = require('https')
const os = require('os');
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

// 获取本机ip
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

const { initConf, getConf } = require(`${process.cwd()}/conf`)
const { parseParams } = require(`${process.cwd()}/until/util`)
const ENTER = require(`${process.cwd()}/server/routers/enter`)
const HEADER = require(`${process.cwd()}/server/routers/header`)
let argv = process.argv.slice(2)
argv = parseParams(argv)
let app = new Koa()
const { webapp } = argv
app.use(bodyParser())

initConf(app, { argv }, 'env').then( async res => {
    const ROUTES = await require(`${process.cwd()}/webapp/${webapp}/routes/index`)
    app.use(ENTER)
    app.use(HEADER)
    app.use(ROUTES.routes(), ROUTES.allowedMethods())

    http.createServer(app.callback()).listen(getConf("port"))
    https.createServer(app.callback()).listen(getConf("port") + 1)
    console.log(`
    App running at:
    - Local:   http://localhost:${getConf("port")}/
    - Network: http://${getIPAdress()}:${getConf("port")}/
    `)
})


