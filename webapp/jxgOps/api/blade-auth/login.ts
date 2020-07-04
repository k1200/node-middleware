interface HttpConf {
	methods?: string
	timeout?: number
	path: string
	header?: string[]
}
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
	httpConf: HttpConf
	params: Params
	enter: Enter
	outer: Outer
}
let params:Params
const Login = () => {
	let conf:Login = {
		id: 'kml-auth_login',
		httpConf: {
			path: `/${__dirname}/oauth/token/${__filename}`
		},
		params,
		enter (req, res, next) {
			console.log("kml-auth_login")
		},
		outer (req, res, next) {
			res.body = {
				code: 200,
				message: "success",
				data: ""
			}
			return false
		}
	}
	return conf
}
exports = module.exports = Login
