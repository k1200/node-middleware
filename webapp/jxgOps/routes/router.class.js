const ROUTER = require("koa-router")();
const Axios = require("./axios");
const { Conf, ErrorCode } = require(`${process.cwd()}/conf`);

const request = Symbol('request');
const parserRouter = Symbol('parser_router');
const parserParams = Symbol('parser_params');
const setHeader = Symbol('set_header');
const enter = Symbol('enter');
const outer = Symbol('outer');
const PARAMS_ERROR = 4000
const paramsError = (ctx, next, message, data=null) => {
  ctx.body = {
    success: false,
    code: ErrorCode.PARAMS_ERROR,
    message,
    data
  }
}
const paraseCommunicate = (ctx, next, params) => {
  return params.every((item, index) => {
    if (item.required) {
      if (!params[item.prop]) {
        paramsError(ctx, next, item.message)
        return false
      }
      return true
    }
    if (item.validator) {
      return validator(params, item, index, function (msg) {
        if (msg) {
          paramsError(ctx, next, msg)
          return false
        }
        return true
      })
    }
    return true
  })
}

class KmlRouter {
  constructor(id) {
    this.id = id;
    this.conf = this.conf && this.conf.bind(this) && this.conf()
    this.enter = this.enter && this.enter.bind(this);
    this.outer = this.outer && this.outer.bind(this);
    this.router = ROUTER
    this[enter]()
    return this
  }
  async [request]() {
    const {
      method = "get",
      url = Conf.url || this.conf || this.id,
      port = Conf.port || "80",
      timeout = Conf.timeout || 60000,
      header = Conf.header || null,
      type = Conf.type || 'application/json',

    } = this.conf;
  }
  async [parserRouter]() {
    const conf = this.conf;
    const method = conf["method"] || "get";
    this.router[method](this.conf.url || this.id, async (ctx, next) => {
      
      // 其他操作
      // 1 跨域 请求头处理
      // this._setHeader()
      // 2 授权
      /** **/
      // 3 参数处理
      let res = await this[parserParams](ctx, next)
      if (!res) return false
      this.enter(ctx, next)
    });
  }
  async [parserParams](ctx, next) {
    const query = this.conf.query || []
    const data = this.conf.data || []
    const dataType = this.conf.dataType
    return paraseCommunicate(ctx, next, [...query, ...data], dataType)
  }
  async [enter]() {


    //
    this[parserRouter]();
  }
  [setHeader](ctx, next) {
    
  }
  async [outer]() { }
}
exports = module.exports = KmlRouter