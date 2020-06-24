## koa 中 next 函数的理解

[官方文档介绍](https://koa.bootcss.com/)：当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。

```
1.  const Koa = require('koa');
2.  const app = new Koa();
3.
4.  // logger
5.
6.  app.use(async (ctx, next) => {
7.    await next(); // a
8.    const rt = ctx.response.get('X-Response-Time');
9.    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
10. });
11.
12. // x-response-time
13.
14. app.use(async (ctx, next) => {
15.   const start = Date.now();
16.   await next(); // b
17.   const ms = Date.now() - start;
18.   ctx.set('X-Response-Time', `${ms}ms`);
19. });
20.
21. // response
22.
23. app.use(async ctx => {
24.   ctx.body = 'Hello World';
25. });
26.
27. app.listen(3000);
```

当代码运行到第 7，调用 next() 函数行时，当前函数暂停执行；
接下来执行第 15 行代码，运行到 16 行时，调用 next() 函数，当前函数暂停执行；
再是执行第 24 行代码，执行完后回到 b 处，再执行 b 所在函数剩余的代码，执行完毕之后，回到 a 处执行 a 所在函数剩余的代码。  
简单说就是 **当一个中间件调用 next() 则该函数暂停, 执行下一个中间件的代码，待下一个中间件中的代码执行完毕之后，回到上一个中间件执行剩余代码**
