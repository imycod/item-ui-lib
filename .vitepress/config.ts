import process from 'node:process'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'unisc-item-ui',
  base: process.env.NODE_ENV === 'production' && process.env.BUILD_VERCEL === undefined ? '/unisc-item-ui/' : '/',
  description: 'This is a vue component library',
  rewrites: {
    'docs/(.*)': '(.*)',
    'packages/icons/docs/(.*)': 'components/icons/(.*)',
    'packages/unisc-item-ui/src/:path/(.*)': 'components/:path/(.*)',
    // 'packages/utils/src/:path/(.*)': 'utils/:path/(.*)',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // 这里大家需要注意我们直接写/introduce，他会自动读取我们运行目录中的introduce.md文件
      // 我们来实现一下这个文件，
      // 我们的根目录就是我们的项目的根目录
      { text: '介绍', link: '/introduce' },
      // 我们这种最后带着斜杠的，他真正读取的是我们根目录下的components/index.md的文件，那么我们先创建一下这个文件
      { text: '组件', link: '/components/' },
      { text: '工具', link: '/utils/' },
    ],

    // 我们将sidebar变成一个对象，然后我们将nav中的link做为key，这个key对应的value就是数组
    // 我们先来实现一下这个数组
    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [
            // 我们可以在items中添加多个子侧边
            { text: '按钮', link: '/components/button/' },
          ],
        },
      ],
    },
  },
})
