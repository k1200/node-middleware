interface Conf {
	whitelist: string
	'max-age'?: number
	'allow-headers'?: string[]
}
const Conf: Conf = {
	whitelist: '*', // 域名白名单
}
exports = module.exports = Conf
