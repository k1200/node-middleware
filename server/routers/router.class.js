/**
* @file 路由基类
* @version 0.0.1
* @author 1200 <1053182739@qq.com>
* @date 2020-07-28 17:29:34
*/
const ROUTER = require("koa-router")();
const Axios = require("./axios");
const { Conf, ErrorCode } = require(`${process.cwd()}/conf`);

// 私有化方法和常量
const request = Symbol('request');
const parserRouter = Symbol('parser_router');
const parserParams = Symbol('parser_params');
const setHeader = Symbol('set_header');
const enter = Symbol('enter');
const outer = Symbol('outer');
/**
* @function 参数错误
* @param {String} message 自定义错误信息
* @param {Any} data 自定义错误数据
* @returns
*/
const paramsError = (ctx, next, message, data = null) => {
  ctx.body = {
    success: false,
    code: ErrorCode.PARAMS_ERROR,
    message,
    data
  }
}
/**
* @function 请求解析
* @param {Object} params 需要的请求参数
* @returns {Boolean}
*/
const paraseCommunicate = (ctx, next, params) => {
  // 客户端传过来的参数
  const options = { ...ctx.body, ...ctx.query }
  return params.every((item, index) => {
    // 参数是否必填
    if (item.required) {
      if (!options[item.prop]) {
        paramsError(ctx, next, item.message)
        return false
      }
      return true
    }
    // 参数校验
    if (item.validator) {
      return item.validator(options, item, index, function (msg) {
        if (msg) {
          paramsError(ctx, next, msg)
          return false
        }
        return true
      })
    };
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
  // 私有请求方法
  [request](ctx, next) {
    const method = this.conf.method || "post",
      baseURL = Conf.baseURL || Conf.$options.baseURL || this.conf.baseURL,
      url = this.conf.url || this.id,
      port = Conf.port || this.conf.port || "80",
      timeout = Conf.timeout || this.conf.timeout || 60000,
      header = Conf.header || null,
      type = Conf.type || this.conf.type || 'application/json';
    return Axios({
      method,
      url,
      params: ctx.query,
      baseURL
    })
  }
  // 公有的请求方法
  async request(ctx, next) {
    const res = await this[request](ctx, next)
    this[outer](ctx, next, res)
  }
  // 路由解析
  async [parserRouter]() {
    const conf = this.conf;
    const method = conf["method"] || "get";
    this.router[method](this.id, async (ctx, next) => {
      this.ctx = ctx
      this.next = next

      // 其他操作
      // 1 跨域 请求头处理
      // this._setHeader()
      // 2 授权
      /** **/
      // 3 参数处理
      let res = this[parserParams](ctx, next)
      if (!res) return false
      await this.enter(ctx, next)
      await next()
    });
  }
  // 参数解析
  [parserParams](ctx, next) {
    const query = this.conf.query || []
    const data = this.conf.data || []
    const dataType = this.conf.dataType
    return paraseCommunicate(ctx, next, [...query, ...data], dataType)
  }
  // 私有入口
  [enter]() {
    this[parserRouter]();
  }
  // 
  [setHeader](ctx, next) {

  }
  // 私有出口
  [outer](ctx, next, result, bool) {
    this.outer(ctx, next, result)
  }
}
exports = module.exports = KmlRouter