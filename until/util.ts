interface resParams {
	[propName: string]: any
}
export const parseParams: (str: string | string[]) => resParams = (str) => {
	let params = str
	if (typeof params === 'string') {
		params = params.split(',')
	}
	let data = {}
	for (let item of params) {
		let param = item.split('=')
		data[param[0]] = param[1]
	}
	return data
}

export const isObject: (param: any) => boolean = (param) => {
	return Object.prototype.toString.call(param) === '[object Object]'
}
export const isArray: (param: any) => boolean = (param) => {
	return Object.prototype.toString.call(param) === '[object Array]'
}
export const isFun: (param: any) => boolean = (param) => {
	return Object.prototype.toString.call(param) === '[object Function]'
}
export const isString: (param: any) => boolean = (param) => {
	return typeof param === 'string'
}
export const isBoolean: (param: any) => boolean = (param) => {
	return typeof param === 'boolean'
}
export const isNumber: (param: any) => boolean = (param) => {
	return typeof param === 'number'
}
export const getTypeof: (param: any) => string = (param) => {
	let type: string = typeof param
	if (type === 'object') {
		let prototype = Object.prototype.toString.call(param)
		type = prototype.match('Array')
			? 'array'
			: prototype.match('Function')
			? 'function'
			: 'object'
	}
	return type
}
