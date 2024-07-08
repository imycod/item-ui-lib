import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'

// 导入demo插件
import { vitepressDemo } from 'vite-plugin-vitepress-demo'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { tsxAutoProps } from 'vite-plugin-tsx-auto-props'
import Components from 'unplugin-vue-components/vite'
import { itemUIResolver } from './scripts/item-ui-resolver'

// 读取我们当前的根目录
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
      // 我们让他自动搜索，我们所有项目中的demos下的vue文件
      glob: ['**/demos/*.vue'],
    }),
    vueJsx(),
  ],
  // 我们使用vite中给我们提供的resolve配置项中的alias来实现一个重命名。
  resolve: {
    alias: [
      {
        // 我们复制我们的utils中的配置，直接修改一下
        'find': /^unisc-item-ui/,
        // 然后再把utils替换成unisc-item-ui，这样我们就完成了配置
        'replacement': path.resolve(baseUrl, 'packages/unisc-item-ui/src'),
      },
      {
        // 我们通过正则表达式去匹配以@unisc-item-ui/utils的导入配置
        'find': /^@unisc-item-ui\/utils/,
        // 然后我们把路径替换成绝对路径地址
        'replacement': path.resolve(baseUrl, 'packages/utils/src'),
      },
      {
        // 我们通过正则表达式去匹配以@unisc-item-ui/icons
        'find': /^@unisc-item-ui\/icons/,
        // 然后我们把路径替换成绝对路径地址
        'replacement': path.resolve(baseUrl, 'packages/icons/src'),
      },
    ],
  },
})
