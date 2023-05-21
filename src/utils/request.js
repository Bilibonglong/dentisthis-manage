import axios from 'axios'; //引入axios包
import {
    MessageBox,
    Message
} from 'element-ui'
import store from '@/store'


//创建实例
const ajax = axios.create({
    withCredentials: false, //跨域请求是否允许携带cookie资源凭证
    baseURL:'http://127.0.0.1:5072',
    time:10000,
    headers: {
        // 'Content-Type': 'application/json;charset=UTF-8'
      },
});



/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

 ajax.interceptors.request.use(
    (config) => {
        //添加token
        const token = store.getters['token/accessToken'];
        if (token != null) {
            config.headers['Authorization']= 'Bearer ' + token;
        }
        return config;
    },
    error => Promise.reject(error)
)


ajax.interceptors.response.use(
    response => {
        return response;
        
    },
    error => {
        if (error.response) {
            tip.warning("asd")
        }
    }
)

/**
 * 提示函数
 */
const tip = msg => {
    // 使用UI框架自带的错误弹框即可
    Vue.prototype.$msg.error("sdf")
}

export default ajax;