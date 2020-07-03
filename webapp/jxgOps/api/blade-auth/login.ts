interface params {
	username: string
	password: string
	grant_type?: string
	scope?: string
	type?: string
}
interface login {}
const Login = () => {
	return {
		id: 'kml-auth_login',
		params: {
			username: '',
			password: '',
			grant_type: 'password',
			scope: 'all',
			type: 'account',
		},
		path: `/${__dirname}/oauth/token/${__filename}`,
	}
}
exports = module.exports = Login
