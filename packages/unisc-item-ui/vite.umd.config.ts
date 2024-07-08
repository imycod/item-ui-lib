import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { tsxAutoProps } from 'vite-plugin-tsx-auto-props'

const baseUrl = fileURLToPath(new URL('../', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tsxAutoProps(),
  ],
  build: {
    rollupOptions: {
      // 我们这里只排除一下vue
      external: ['vue'],
      // 我们还需要配置一下输出的部分
      output: {
        // 配置一下导出，还是使用named
        exports: 'named',
        // 因为我们排除了vue，所以我们umd需要我们使用全局挂载的形式
        globals: {
          vue: 'vue',
        },
      },
    },
    lib: {
      // 入口我们使用entry
      entry: 'src/index.ts',
      fileName: () => 'index.js',
      name: 'itemUI',
      // formats这次我们就直接使用umd
      formats: ['umd'],
    },
  },
})
