/**
* @file 路由工具模块
* @version 0.0.1
* @author 1200 <1053182739@qq.com>
* @date 2020-07-28 15:59:49
*/
const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

exports = module.exports = {
    /**
     * @function 批量注册路由
     * @param {Object} data 
     * @param {String} data.dirname - 目录名
     * @param {String} data.children - 子目录名
     * @param {String[]} [data.filter] - 需要过滤的文件名集合
     * @returns {Function}
     */
    register: async function ({ dirname, children, filter = ["index"] }) {
        const fullPath = children ? `${dirname}/${children}` : dirname
        // 同步读取 fullPath 下的文件名和子目录名
        const files = fs.readdirSync(fullPath)
        files
            .filter(file => ~file.search(/^[^\.].*\.js$/)) // 过滤子目录
            .forEach(file => {
                const file_name = file.substr(0, file.length - 3);
                if (filter.includes(file_name)) return false // 过滤需要过滤的文件
                const file_router = require(path.join(fullPath, file)); 
                let api_router = null;
                file_router.forEach((R, index) => {
                    let [url, name] = ['/', R.name.toLocaleLowerCase()]
                    // 类名为 "_" 的类 默认为根路径
                    name !== "_" && (url += name)
                    // 实例化路由
                    const instantiaApi = new R(url)
                    index === file_router.length - 1 && (api_router = instantiaApi.router)
                });
                // 注册路由
                router.use(`/${file_name}`, api_router.routes(), api_router.allowedMethods())
            })
        return router
    }
}