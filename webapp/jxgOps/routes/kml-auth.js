const RouterClass = require(`${process.cwd()}/server/routers/router.class`);

exports = module.exports = [
  class FindPwd extends RouterClass {
    constructor(url) {
      super(url);
    }
    conf() {
      let conf = {
        url: '/blade-system/tenant/frontend/findPwd',
        query: [
          {
            prop: "username",
            required: true,
            message: '请输入用户名或手机号',
            validator(params, column, index, callback) {
              console.log(params, column, index);
              return callback()
            }
          }
        ]
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
];
