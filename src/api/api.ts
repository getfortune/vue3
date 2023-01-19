//  进行接口API的统一管理
import { request } from './axios'

/**
 * @description -封装User类型的接口方法
 */
export class UserService {       // 模块一
    /**
     * @description 用户登录
     * @param {string} username - 用户名
     * @return {HttpResponse} result
     */
    static async login3(params:Object) {   // 接口一
        return request('/login',params, 'post')
    }
}

export default {
    index:()=>request('/index',{}, 'get')
}
