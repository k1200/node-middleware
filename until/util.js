exports = module.exports = {
	parseParams: str => {
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
	},

	isObject: (param) => {
		return Object.prototype.toString.call(param) === '[object Object]'
	},
	isArray: (param) => {
		return Object.prototype.toString.call(param) === '[object Array]'
	},
	isFun: (param) => {
		return Object.prototype.toString.call(param) === '[object Function]'
	},
	isString: (param) => {
		return typeof param === 'string'
	},
	isBoolean: (param) => {
		return typeof param === 'boolean'
	},
	isNumber: (param) => {
		return typeof param === 'number'
	},
	getTypeof: (param) => {
		let type = typeof param
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
}

