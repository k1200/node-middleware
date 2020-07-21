const ROUTER = require("koa-router")();
const Axios = require("./axios");
const Conf = require(`${process.cwd()}/conf`);

const request = Symbol('request');
const parserRouter = Symbol('parser_router');
const parserParams = Symbol('parser_params');
const setHeader = Symbol('set_header');
const enter = Symbol('enter');
const outer = Symbol('outer');
const paramsError = (ctx, next, message, data=null) => {
  ctx.body = {
    success: false,
    code: PARAMS_ERROR,
    message,
    data
  }
}
const paraseCommunicate = (ctx, next, params, type="query") => {
  let options = ctx[type]
  return params.every((item, index) => {
    const [prop, required, message, validator] = item
    if (required) {
      if (!options[prop]) {
        paramsError(ctx, next, message)
        return false
      }
      return true
    }
    if (validator) {
      return validator(params, item, index, function (msg) {
        if (msg) {
          paramsError(ctx, next, message)
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
    this.conf = this.conf && this.conf.bind(this);
    this.enter = this.enter && this.enter.bind(this);
    this.outer = this.outer && this.outer.bind(this);
    this.router = ROUTER
    this[enter]()
    return this
  }
  async [request]() {
    const Conf = require(`${process.cwd()}/conf`);
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
    this.router[method](this.conf.url || this.id, (ctx, next) => {
      
      // 其他操作
      // 1 跨域 请求头处理
      // this._setHeader()
      // 2 授权
      /** **/
      // 3 参数处理
      this.enter(ctx, next)
    });
  }
  async [parserParams](ctx, next) {
    const [params=[], data=[], dataType] = this.conf
    let res = paraseCommunicate(ctx, next, [...params, ...data], dataType)
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