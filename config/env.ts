const env = {
	head: ['authorization', 'version', 'Tenant-Code', 'Blade-Auth'],
	baseUrl: 'http://192.168.1.222',
	timeout: 60000,
	initFun(req:Function, res:Function, next:Function) {
		console.log("env.initFun");
		next()
	},
	outFun(req:Function, res:Function, next:Function) {
		console.log("env.outFun");
		next()
	}
}

exports = module.exports = env
