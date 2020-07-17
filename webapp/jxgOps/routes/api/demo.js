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
    constructor() {
      super(`${__filename}_demo`);
    }
    conf() {
      let conf = {};
      return conf;
    }
    enter() {
      console.log("kml-auth_login");
    }
    outer() {
      this.res.body = {
        code: 200,
        message: "success",
        data: "",
      };
      return false;
    }
  },
  class Child extends RouterClass {
    constructor() {
      super(`${__filename}_child`);
    }
    conf() {
      let conf = {};
      return conf;
    }
    enter() {
      console.log("kml-auth_child");
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
