import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'

// 导入demo插件
import { vitepressDemo } from 'vite-plugin-vitepress-demo'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { tsxAutoProps } from 'vite-plugin-tsx-auto-props'
import Components from 'unplugin-vue-components/vite'
import { itemUIResolver } from './scripts/item-ui-resolver'

const baseUrl = fileURLToPath(new URL('.', import.meta.url))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        itemUIResolver(),
      ],
    }),
    tsxAutoProps(),
    vitepressDemo({
      glob: ['**/demos/*.vue'],
    }),
    vueJsx(),
  ],
  resolve: {
    alias: [
      {
        'find': /^unisc-item-ui/,
        'replacement': path.resolve(baseUrl, 'packages/unisc-item-ui/src'),
      },
    ],
  },
})
