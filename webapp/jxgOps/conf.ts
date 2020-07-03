interface Conf {
	whitelist: string
	'max-age'?: number
	'allow-headers'?: string[]
	url: string
}
const env = process.env.NODE_ENV
let url =
	env === 'pro' ? 'https://jixgapi.jixugou.cn' : 'http://testapi.jixugou.cn'
const Conf: Conf = {
	whitelist: '*', // 域名白名单
	'allow-headers': ['Authorization', 'Blade-Auth', 'Tenant-Code', 'version'],
	url,
}
exports = module.exports = Conf
