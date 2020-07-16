const ROUTER = require("koa-router")();
const Axios = require("./axios")
const Conf = require(`${process.cwd()}/conf`);

export default class KmlRouter {
  id: string;
  conf: any;
  enter: any;
  outer: any;
  router: any = ROUTER;
  constructor(id: string) {
    this.id = id;
    this.conf = this.conf && this.conf.bind(this);
    this.enter = this.enter && this.enter.bind(this);
    this.outer = this.outer && this.outer.bind(this);
  }
  private async _request() {
    const Conf = require(`${process.cwd()}/conf`);
    const {
      method = "get",
      url = Conf.url,
      port = Conf.port || "80",
      timeout = Conf.timeout || 60000,
      header = Conf.header || null,
      type = Conf.type || 'application/json',

    } = this.conf;
  }
  private async _parserRouter() {
    const conf = this.conf;
    const method = conf["method"] || "get";
    const r = this.router[method];
    const { ctx } = await r(
      conf["url"],
      async (ctx: any, next: Function) => ({ ctx, next })
    );
  }
  private async _enter() {
    // 1 跨域 请求头处理
    // this._setHeader()
    // 2 授权
    /** **/
    // 3 参数处理

    //
    this._outer();
  }
  private _setHeader() {}
  private async _outer() {}
}
