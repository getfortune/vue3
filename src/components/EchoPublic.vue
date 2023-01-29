<template>
  <button @click="submit">123</button>
</template>

<script setup lang="ts" name="EchoPublic">
import useCurrentInstance from "../utils/UseCurrentInstance";
import api from "../api/api";

const {proxy} = useCurrentInstance();
proxy.$Echo.channel('laravel_database_Countryside')
    .listen('Free',(e:any)=>{
      console.log(e)
    })

let submit = async () =>{
  let res = await api.event();
}
</script>

<style scoped>

</style>
