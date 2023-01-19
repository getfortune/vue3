import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
      plugins: [vue()],
  });
};