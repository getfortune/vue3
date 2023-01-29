import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Echo from "laravel-echo";
// @ts-ignore
import socketIo from "socket.io-client"

const app = createApp(App);

// 初始化websocket 客户端
// @ts-ignore
window.io = socketIo;
app.config.globalProperties.$Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});
app.mount('#app')
