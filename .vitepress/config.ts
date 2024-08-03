import process from 'node:process'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'unisc-item-ui',
  base: process.env.NODE_ENV === 'production' && process.env.BUILD_VERCEL === undefined ? '/item-ui/' : '/',
  description: 'This is a vue component library',
  rewrites: {
    'docs/(.*)': '(.*)',
    'packages/icons/docs/(.*)': 'components/icons/(.*)',
    'packages/item-ui/src/:path/(.*)': 'components/:path/(.*)',
    // 'packages/utils/src/:path/(.*)': 'utils/:path/(.*)',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '介绍', link: '/introduce' },
      { text: '组件', link: '/components/' },
      { text: '工具', link: '/utils/' },
    ],

    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: '按钮', link: '/components/button/' },
            { text: '打印组件', link: '/components/print-progress/' },
            { text: '侧边栏', link: '/components/sidebar/' },
          ],
        },
      ],
    },
  },
})
