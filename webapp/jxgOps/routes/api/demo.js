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
      let conf = {
        dataType: 0, // 返回的data的默认值（与前端数据结构保持一致） Number: 0, String: '', Boolean: true, Object: {}, Array: []
        query: [
          {
            prop: "name",
            required: true,
            message: '请输入用户名',
            validator(params, column, index, callback) {
              console.log(params, column, index);
              return callback()
            }
          },
          {
            prop: "password",
            validator(params, column, index, callback) {
              return callback()
            }
          },
          {
            prop: "phone"
          }
        ],
        body: [],
        header: [{
          prop: 'Blade-Auth',
          required: true
        }]
      };
      return conf;
    }
    enter(ctx, next) {
      ctx.body = ctx['Access-Control-Allow-Headers']
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
