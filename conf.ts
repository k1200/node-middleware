const path = require('path')
const { isObject } = require(`${process.cwd()}/until/util`)
interface params {
	[x: string]: any
}
let conf: params = {}
// 初始化配置
export const initConf: (params: params, name?: string) => void = async (
	params,
	name
) => {
	params && setConf(params, name)
	const module = `${process.cwd()}/webapp/${conf.env.argv.webapp}/conf`
	setConf({ ...getConf('env'), mode: process.env.NODE_ENV }, 'env')
	try {
		const AppConf = await require(module)
		setConf(AppConf, '$options')
	} catch (e) {}
}
// 设置参数
export const setConf: (params: params, name?: string) => params = (
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
export const getConf: (name?: string) => any = (name) => {
	return name ? conf[name] : conf
}
