//  进行接口API的统一管理
import { request } from './axios'

export default {
    index:()=>request('/index',{}, 'get'),
    event:()=>request('/event',{}, 'get'),
    private:()=>request('/api/private',{}, 'post'),
    d3:()=>request('/api/3',{}, 'get'),
}
