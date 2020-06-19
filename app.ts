const Koa = require('koa')
const app = new Koa()
// const bodyParser = require('koa-bodyparser')

// const router = require('./routes/index')
const router = require('./routes/middleware/compose')
// app.use(bodyParser())
app.use(router)

app.listen(3000)
