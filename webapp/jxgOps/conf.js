const env = process.env.NODE_ENV
let baseURL =
	env === 'pro' ? 'https://jixgapi.jixugou.cn' : 'http://testapi.jixugou.cn'
const Conf = {
	whitelist: '*', // 域名白名单
	'allow-headers': ['Authorization', 'Blade-Auth', 'Tenant-Code', 'version'],
	baseURL,
	port: 1200
}
exports = module.exports = Conf
