const AXIOS = require("axios")
const Conf = require(`${process.cwd()}/conf`)

AXIOS.defaults.timeout = Conf.timeout;

//跨域请求，允许保存cookie
// AXIOS.defaults.withCredentials = Conf.withCredentials;

//HTTPrequest拦截
AXIOS.interceptors.request.use(
    config => {
       
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//HTTPresponse拦截
AXIOS.interceptors.response.use(
    res => {
        const status = +res.data.code || 200;
        //如果是401则跳转到登录页面
        if (status === 401) {
            
        }
        // 如果请求为非200否者默认统一处理
        if (status !== 200) {

            return Promise.reject(new Error());
        }
        return res;
    },
    error => {
        return Promise.reject(new Error(error));
    }
);

exports = module.exports = AXIOS