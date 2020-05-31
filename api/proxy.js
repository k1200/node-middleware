const axios = require('axios')
const logs = require('../logs')
// //HTTPrequest拦截
// axios.interceptors.request.use(
// 	(config) => {
// 		return config
// 	},
// 	(error) => {
// 		return Promise.reject(error)
// 	}
// )
// //HTTPresponse拦截
axios.interceptors.response.use(
	(res) => {
		const status = +res.data.code || 200
		const message = res.data.msg || '未知错误'
		//如果是401则跳转到登录页面
		if (status === 401) {
		}
		// 如果请求为非200否者默认统一处理
		if (status !== 200) {
		}
		return res.data
	},
	(error) => {
		// 写入错误日志 调用错误中间件
		let errorRes = {}
		if (error.response) {
			errorRes = {
				code: error.response.status,
				data: error.response.data,
				type: 'servers',
			}
			// logs('servers', errorRes, error.request, '')
		} else {
			errorRes = {
				code: 400,
				data: error,
				type: 'node',
			}
			// logs('servers', error, '', '')
		}
		return errorRes
	}
)
const middleware = async (ctx, next) => {
	let { header, method, url, query } = ctx
	query = ctx.request.body
	await axios
		.request({
			url,
			method,
			baseURL: `https://jixgapi.jixugou.cn`,
			params: query,
			data: ctx.request.body,
			timeout: 60000,
			headers: {
				authorization: header['authorization'] || '',
				version: header['version'] || '',
				'Tenant-Code': header['Tenant-Code'] || '000000',
				'Blade-Auth': header['Blade-Auth'] || '',
			},
		})
		.then((res) => {
			ctx.body = res
		})

	next()
}

module.exports = middleware
