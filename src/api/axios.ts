//  二次封装axios请求配置拦截器
import axios from 'axios'
import { showMessage } from "./status";
import {useTokenStore} from "../stores/store";   // 引入状态码文件

// 设置接口超时时间
axios.defaults.timeout = 60000;

// 请求地址，这里是动态赋值的的环境变量
// @ts-ignore
axios.defaults.baseURL = import.meta.env.VITE_API_DOMAIN;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // 获取store
    const store = useTokenStore();
    // 配置请求头
    config.data = {
      'Content-Type':'application/json;charset=UTF-8',        // 传参方式json
    };
    if (import.meta.env.VITE_VUE_APP_DEBUG === "true") {
      config.url += "?XDEBUG_SESSION_START=1"
    }
    if (store.getToken() != ''){
      config.headers['Authorization'] = store.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {response} = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);           // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data);
    } else {
      console.log('网络连接异常,请稍后再试!');
    }
  }
);

// 封装 GET POST 请求并导出
export function request(url='',params={},type='POST'){
//设置 url params type 的默认值
return new Promise((resolve,reject)=>{
  let promise
  if( type.toUpperCase()==='GET' ){
    promise = axios({
      url,
      params
    })
  }else if( type.toUpperCase()=== 'POST' ){
    promise = axios({
      method:'POST',
      url,
      data:params
    })
  }
  //处理返回
  // @ts-ignore
  promise.then(res=>{
    // 因为axios在封装我们返回请求是会给我们加上一层 data 所以在这里我们返回的时候就需要取出来
    resolve(res.data)
  }).catch(err=>{
    reject(err)
  })
})
}
