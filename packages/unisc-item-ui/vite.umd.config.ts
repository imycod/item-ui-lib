import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { tsxAutoProps } from 'vite-plugin-tsx-auto-props'



export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tsxAutoProps(),
  ],
  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'vue',
        },
      },
    },
    lib: {
      entry: 'src/index.ts',
      fileName: () => 'index.js',
      name: 'itemUI',
      formats: ['umd'],
    },
  },
})
