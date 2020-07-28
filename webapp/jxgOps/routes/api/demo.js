const router = require("koa-router")();
const RouterClass = require(`${process.cwd()}/server/routers/router.class`);

exports = module.exports = [
  class _ extends RouterClass {
    constructor(url) {
      super(url);
    }
    conf() {
      let conf = {
        // method: "post",
        url: '/blade-system/tenant/frontend/findPwd',
        dataType: 0, // 返回的data的默认值（与前端数据结构保持一致） Number: 0, String: '', Boolean: true, Object: {}, Array: []
        query: [
          {
            prop: "username",
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
    async enter(ctx, next) {
      await this.request(ctx, next)
    }
    outer(ctx, next, result) {
      ctx.body = result
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

];
