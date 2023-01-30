<template>
  <button @click="submit">123</button>
  <button @click="login">login</button>
</template>

<script setup lang="ts" name="EchoPublic">
import useCurrentInstance from "../utils/UseCurrentInstance";
import api from "../api/api";
import {useTokenStore} from "../stores/store";

const {proxy} = useCurrentInstance();
const store = useTokenStore();
// 解构store 响应式需要使用
proxy.$Echo.channel('Countryside')
    .listen('Free',(e:any)=>{
      console.log(e,123)
    })
proxy.$Echo.private('three_good')
    .listen('Prize',(e:any)=>{
      console.log(e,456)
    })

let submit = async () =>{
  // let res = await api.event();
  let res = await api.private();
}
type Token = {token:string}
let login = async ()=>{
  let d3 = <Token>await api.d3();
  store.saveToken(d3.token);
}
</script>

<style scoped>

</style>
