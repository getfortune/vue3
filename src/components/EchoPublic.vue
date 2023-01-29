<template>
  <button @click="submit">123</button>
  <button @click="login">login</button>
</template>

<script setup lang="ts" name="EchoPublic">
import useCurrentInstance from "../utils/UseCurrentInstance";
import api from "../api/api";

const {proxy} = useCurrentInstance();
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

let login = async ()=>{
  let d3 = await api.d3();
  proxy.token = d3;
}
</script>

<style scoped>

</style>
