import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Echo from "laravel-echo";
import { createPinia } from 'pinia'
// @ts-ignore
import socketIo from "socket.io-client"

const pinia = createPinia()
const app = createApp(App);
// 初始化websocket 客户端
// @ts-ignore
window.io = socketIo;
app.config.globalProperties.$Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});

app.use(pinia)
app.mount('#app')
