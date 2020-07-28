const os = require('os');
const { getConf } = require(`${process.cwd()}/conf`)
// 获取本机ip
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
console.log(`
App running at:
- Local:   http://localhost:${getConf("port")}/
- Network: http://${getIPAdress()}:${getConf("port")}/
`)