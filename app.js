const Koa = require('koa')
const app = new Koa()

// const index = require('./routes/index')
const compose = require('./routes/middleware/compose')
app.use(compose)

app.listen(3000)
