/**
* @file 全局请求头处理
* @version 0.0.1
* @author 1200 <1053182739@qq.com>
* @date 2020-07-28 17:19:35
*/
const middleware = async (ctx, next) => {
	if (ctx.method === 'OPTIONS') {
		ctx.status = 204
		ctx.body = ''
		return false
	}
	const conf = ctx.$conf
	/**
	 * 关键点：
	 * 1、如果需要支持 cookies,
	 *    Access-Control-Allow-Origin 不能设置为 *,
	 *    并且 Access-Control-Allow-Credentials 需要设置为 true
	 *    (注意前端请求需要设置 withCredentials = true)
	 * 2、当 method = OPTIONS 时, 属于预检(复杂请求), 当为预检时, 可以直接返回空响应体, 对应的 http 状态码为 204
	 * 3、通过 Access-Control-Max-Age 可以设置预检结果的缓存, 单位(秒)
	 * 4、通过 Access-Control-Allow-Headers 设置需要支持的跨域请求头
	 * 5、通过 Access-Control-Allow-Methods 设置需要支持的跨域请求方法
	 */
	const MaxAge = conf['max-age'] || 86400
	const AllowOrigin = conf['whitelist'] || '*'
	let AllowHeaders = [
		'X-Requested-With',
		'User-Agent',
		'Referer',
		'Content-Type',
		'Cache-Control',
	]
	conf['allow-headers'] &&
		(AllowHeaders = [...AllowHeaders, ...conf['allow-headers']])
	let { protocol, host } = ctx
	if (protocol && host) {
		ctx.set('Access-Control-Allow-Origin', AllowOrigin)
		ctx.set(
			'Access-Control-Allow-Methods',
			'POST, GET, OPTIONS, DELETE, PUT'
		)
		ctx.set('Access-Control-Allow-Headers', AllowHeaders.join(','))
		ctx.set('Access-Control-Max-Age', MaxAge)
		ctx.set('Access-Control-Allow-Credentials', 'true')
	}
	await next()
}
exports = module.exports = middleware
