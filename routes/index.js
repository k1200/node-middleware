const koaRouter = require('koa-router')();
koaRouter.get('/index/:name?', async (ctx, next) => {
    ctx.type = 'application/json';
    ctx.body = `{status: "succsess", msg: "操作成功", data: {name: ${ctx.params.name} || "匡明亮"}}`;
});
    
module.exports = koaRouter 
