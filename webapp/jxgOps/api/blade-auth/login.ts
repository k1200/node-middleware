interface Enter {
	(req: any, res: any, next: Function): any
}
interface Outer {
	(req: any, res: any, next: Function): void
}
interface Params {
	username: string
	password: string
	grant_type?: string
	scope?: string
	type?: string
}
interface Login {
	id: string
	methods?: string
	timeout?: number
	path: string
	'allow-headers'?: string[]
	params: Params
	enter: Enter
	outer: Outer
}
const Login: (params: Params) => any = (params) => {
	let conf: Login = {
		id: 'kml-auth_login',
		path: `/${__dirname}/oauth/token/${__filename}`,
		params,
		enter() {
			console.log('kml-auth_login')
		},
		outer() {
			this.res.body = {
				code: 200,
				message: 'success',
				data: '',
			}
			return false
		},
	}
	return conf
}
exports = module.exports = Login
