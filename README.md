## node koa2 中间件

### 一、初始化项目

    npm init

### 二、安装依赖

    npm install koa - s koa-bodyparser -s axios -s nodemon -s
    koa: https://koa.bootcss.com/
    koa-bodyparser: https://github.com/koajs/bodyparser 解析请求体 中间件
    axios: https://github.com/axios/axios
    nodemon: https://github.com/remy/nodemon Node自动重启工具

### 三、启动简单服务

#### 1. 在项目根目录新建 app.js

    const Koa = require('koa')
    const app = new Koa()
    app.use(async ctx => {
      ctx.body = 'Hello World';
    });
    app.listen(3000)

#### 2. 修改 package.json 文件

    增加启动代码："dev": "node app.js"
    运行 npm run dev
    打开浏览器 输入 localhost:3000
    可看到 Hello World
