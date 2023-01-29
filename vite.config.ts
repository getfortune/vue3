import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite" // 自动导入一些常用的包
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import ViteImages from 'vite-plugin-vue-images'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
export default ({ mode }) => {
  // 检查是否开发
  const isDevelopment = mode === "development";

  return defineConfig({
      server: {
          port: 3000,
      },
      build: {
          // 生成的文件将添加到此处
          outDir: "./../public/app",
      },
      // 也将更改基于模式的基础
      base: isDevelopment ? "/" : "/app/",
      plugins: [
          vue({
            // reactivityTransform:true, // 开启了不需要使用 .value
            // refTransform: true // 开启ref转换 不需要 .value
          }),
          AutoImport({ // 自动导包
              // dts: 'src/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
              imports: ['vue']
          }),
          VueSetupExtend(), // 解决组件声明 name 需要使用两个 script 标签
          ViteImages({
              dirs: ['src/assets/image'] // 图片存放目录 可以直接使用图片不需要导入
          }),
      ],
  });
};
