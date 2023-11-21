import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import GetVersion from "./build/build.js";
import {resolve} from "path";

const version: string = GetVersion("./package.json");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/Tools/",
  resolve: {
    alias: {
      //设置别名以便src下的文件可以使用@找到
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: false, // 输出.map文件,默认是false
    rollupOptions: {
      output: {
        chunkFileNames: `static/js/[name].${version}.js`,
        entryFileNames: `static/js/[name].${version}.js`,
        assetFileNames: `static/[ext]/[name].${version}.[ext]`,
      },
    }
  },
});
