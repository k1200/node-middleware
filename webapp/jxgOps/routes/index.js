/**
* @file 注册路由
* @version 0.0.1
* @author 1200 <1053182739@qq.com>
* @date 2020-07-28 16:25:46
*/
const RouterUntil = require(`${process.cwd()}/server/routers/until`)
const routers = RouterUntil.register({dirname: __dirname})
module.exports = routers