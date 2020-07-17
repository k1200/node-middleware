const router = require("koa-router")();
const RouterClass = require("../router.class");
const Axios = require("../router.class");

// interface Enter {
//   (req: any, res: any, next: Function): any;
// }
// interface Outer {
//   (req: any, res: any, next: Function): void;
// }

// interface Query {
//   [name: string]: any;
// }
// interface Data {
//   [name: string]: any;
// }
// interface Headers {
//   [name: string]: any;
// }
// interface Conf extends Query, Data {
//   method?: String;
//   headers?: Headers;
//   timeout?: Number;
//   host?: string;
//   port?: string;
//   url?: string;
// }
exports = module.exports = [
  class _ extends RouterClass {
    constructor(url) {
      super(url);
    }
    conf() {
      let conf = {};
      return conf;
    }
    enter(ctx, next) {
      ctx.body = ctx.path
    }
    outer(ctx, next) {
      this.res.body = {
        code: 200,
        message: "success",
        data: "",
      };
      return false;
    }
  },
  class Child extends RouterClass {
    constructor(url) {
      super(url);
    }
    conf() {
      let conf = {};
      return conf;
    }
    enter(ctx, next) {
      ctx.body = ctx.path
    }
    outer() {
      this.res.body = {
        code: 200,
        message: "success",
        data: "",
      };
      return false;
    }
  }

// router.get('/', function (ctx, next) {
//   ctx.body = 'demo'
// })

// router.get('/child', function (ctx, next) {
//   ctx.body = 'demo child'
// })

];
