## node koa2 中间件

### 一、初始化项目

    npm init

### 二、安装依赖

    npm install koa - s koa-bodyparser -s axios -s nodemon -s
    koa: https://koa.bootcss.com/
    koa-bodyparser: https://github.com/koajs/bodyparser 解析请求体 中间件
    axios: https://github.com/axios/axios
    nodemon: https://github.com/remy/nodemon Node自动重启工具
    log4js: 日志管理工具
    typescript: ts
    ts-node: ts编译

### 三、启动简单服务

#### 1. 在项目根目录新建 app.ts

    const Koa = require('koa')
    const app = new Koa()
    app.use(async ctx => {
      ctx.body = 'Hello World';
    });
    app.listen(3000)

#### 2. 修改 package.json 文件

    增加启动代码："dev": "node app.jts"
    运行 npm run dev
    打开浏览器 输入 localhost:3000
    可看到 Hello World

#### 2. 热重载

    1. 新建 nodemon.json 文件
    {
      "verbose": false,
      "debug": true,
      "exec": "ts-node ./app.ts",
      "ignore": ["node_modules", "./logs.log"],
      "events": {
        "restart": ""
      },
      "inspect": true
    }
    2. 修改 package.json 文件
    修改启动代码："dev": "nodemon"
