//  进行接口API的统一管理
import { request } from './axios'

export default {
    index:()=>request('/index',{}, 'get'),
    event:()=>request('/event',{}, 'get'),
}
