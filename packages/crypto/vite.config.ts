import Dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
// import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 打包时自动导出dts文件
    Dts()
    // 自动引入tsconfig中的path映射
    // 导出的 d.ts 没有转换 @/* 到相对路径，定位发现是 `vite-tsconfig-paths` 与 `vite-plugin-dts` 有兼容问题
    // issue: https://github.com/qmhc/vite-plugin-dts/issues/70
    // 改回直接声明吧
    // tsconfigPaths({
    //   loose: true,
    //   projects: [resolve(__dirname, 'tsconfig.json')]
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    minify: false,
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',

      formats: ['es', 'cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    },
  }
})
