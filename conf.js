const path = require('path')
const { isObject } = require(`${process.cwd()}/until/util`)
let conf = {}
// 初始化配置
const initConf = async (app, params, name) => {
	params && setConf(params, name)
	const module = `${process.cwd()}/webapp/${conf.env.argv.webapp}/conf`
	setConf({ ...getConf('env'), mode: process.env.NODE_ENV }, 'env')
	setConf(app, 'app')
	try {
		const AppConf = await require(module)
		setConf(AppConf, '$options')
	} catch (e) { }
}
// 设置参数
const setConf = (
	params,
	name
) => {
	if (name) {
		conf[name] = params
		if (name === '$options') {
			conf = { ...conf, ...params }
		}
	} else if (isObject(params)) {
		conf = { ...conf, ...params }
	}
	return conf
}
// 通过名称获取配置
const getConf = (name) => {
	return name ? conf[name] : conf
}
exports = module.exports = {
	initConf,
	setConf,
	getConf,
	conf
}