const ROUTER = require("koa-router")();
const Axios = require("./axios");
const { resolve } = require("path");
const { rejects } = require("assert");
const Conf = require(`${process.cwd()}/conf`);

const request = Symbol('request');
const parserRouter = Symbol('parser_router');
const setHeader = Symbol('set_header');
const enter = Symbol('enter');
const outer = Symbol('outer');

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
  async [enter]() {


    //
    this[parserRouter]();
  }
  [setHeader]() { }
  async [outer]() { }
}
exports = module.exports = KmlRouter