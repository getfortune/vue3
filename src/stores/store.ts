import {defineStore} from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
//1．定义并导出容器
// 参数1:容器的ID，必须唯一，将来 pinia 会把所有的容器挂载到根容器
// 参数2:选项对象
// 返回值:一个函数,调用得到容器实例
export const useTokenStore = defineStore('token', {
    // other options...
    //1．必须是函数:这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
    // 2．必须是箭头函数，这是为了更好的 TS 类型推导
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            token:getToken(),
        }
    },
    // 封装业务逻辑，修改state
    actions: {
        saveToken(token:string){
            this.token = token;
            window.sessionStorage.setItem("token", token);
        },
        getToken(){
            return this.token;
        },
        removeToken(){
            this.token = '';
            window.sessionStorage.removeItem("token");
        }
    },
    //类似于组件的 computed，用来封装计算属性，有缓存的功能
    getters: {

    },
})

function getToken():string {
    let token = (window.sessionStorage.getItem("token") as string);
    return token;
}
