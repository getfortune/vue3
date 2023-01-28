<script setup lang="ts">
import api from "./api/api";
import {nextTick, reactive, ref, Ref} from "vue";

//可以用$()来解构响应式对象，这样就不用写.value
// 可以用$$()来获取原有的响应式对象
let serverInfo: Ref = ref('123');  // 使用ref 之后赋值需要使用 .value 的形式
// reactive 推荐使用方法, 直接在 reactive 上进行改变会破坏响应式，可以修改 reactive 内部的变量来确保响应式
let response:object = reactive({
  'arr': [
    {
      data: '',
      message: '',
      status: '',
    }
  ]
});
let refObject = ref({})

async function getServerData() {
  let res: any = await api.index();
  // ref 错误的写法
  // serverInfo = res.data;
  // ref 正确的写法
  serverInfo.value = res.data;

  // reactive 错误的写法
  // response = res;  // 此时我们对象就丢失了响应式

  // 方法一： es6 对象结构方式    或者   数组解构方式
  // response = {...res}
  // refObject.value = {...res} // 对于浅层次的也可以使用 ref 来定义

  // 方法二: Object.assign  合并两个对象，并返回一个新的对象, 此时的对象也是响应式的
  response = Object.assign(response,res)

  // 推荐使用 方法三： 整体替换
  // response.arr = res;

}

// 数组形式的 reactive
let responseArray = reactive<number[]>([]);
function getArray() {
  // 假设服务器返回的是一个数组
  let resArray:number[] = [1,2,3];
  responseArray.push(...resArray);

}

function change() {
  getServerData();
  getArray();
}

</script>

<template>
  <button @click="change">123</button>
  <span>123</span>
  <h1>{{ serverInfo }}</h1>
  <h1>{{ response.arr.data }}</h1>
  <h1>{{ response.arr.status }}</h1>
  <h1>{{ response.arr.message }}</h1>
  <hr>
  <h1>{{ response.data }}</h1>
  <h1>{{ response.status }}</h1>
  <h1>{{ response.message }}</h1>

<!--  <span v-for="(item,index) in responseArray " :key="index">-->
<!--    {{item}}：-->
<!--  </span>-->
<!--  <h1>{{ refObject.data }}</h1>-->
<!--  <h1>{{ refObject.status }}</h1>-->
<!--  <h1>{{ refObject.message }}</h1>-->
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
