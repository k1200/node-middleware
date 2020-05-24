const fs = require('fs')
const middleware = (type, error, req, userId) => {
	fs.appendFile(
		'logs.log',
		`{
			"type": "${type}",
			"error": ${error},
			"req": ${req},
      "userId": "${userId}",
      "currentTime": "${new Date()}"
		},`,
		(err) => {
			if (err) throw err
			console.log('数据已被追加到文件')
		}
	)
}
module.exports = middleware
