<script setup lang="ts">
import api from "./api/api";
import {nextTick, onBeforeMount, onMounted, reactive, Ref, ref} from "vue";
let serverInfo:Ref = ref('');  // 使用ref 之后赋值需要使用 .value 的形式
let repose:object = reactive(Object); //  reactive 的变量只能赋值为对象
onMounted(async ()=>{
   let res:any = await api.index();
   serverInfo.value = res.data; // 此时不使用 .value 的形式会报错
   repose = res; // 此时的 res 变量必须是一个对象，不能是基本数据类型
})
serverInfo.value = '123';
</script>

<template>
  <span>123</span>
  <h1>{{serverInfo}}</h1>
  <h1>{{repose.data}}</h1>
  <h1>{{repose.status}}</h1>
  <h1>{{repose.message}}</h1>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
