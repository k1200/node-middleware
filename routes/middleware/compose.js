const middleware = [require('./request')]
function compose(middleware) {
	if (!Array.isArray(middleware))
		throw new TypeError('Middleware stack must be an array!')
	for (const fn of middleware) {
		if (typeof fn !== 'function')
			throw new TypeError('Middleware must be composed of functions!')
	}
	return function (context, next) {
		let index = -1
		return dispatch(0)
		function dispatch(i) {
			// index会在next()方法调用后累加，防止next()方法重复调用
			if (i <= index)
				return Promise.reject(new Error('next() called multiple times'))
			index = i
			let fn = middleware[i]
			if (i === middleware.length) fn = next
			if (!fn) return Promise.resolve()
			try {
				// 核心代码
				// 包装next()方法返回值为Promise对象
				return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
			} catch (err) {
				// 遇到异常中断后续中间件的调用
				return Promise.reject(err)
			}
		}
	}
}
module.exports = compose(middleware)
