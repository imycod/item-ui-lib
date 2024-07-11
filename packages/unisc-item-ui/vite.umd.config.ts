/* eslint-disable */
// @ts-nocheck
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { tsxAutoProps } from 'vite-plugin-tsx-auto-props'
import ElementPlus from "unplugin-element-plus/vite";
import AutoImport from "unplugin-auto-import/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import {createStyleImportPlugin, ElementPlusResolve} from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tsxAutoProps(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver()
      ],
    }),
    ElementPlus({
      useSource: false
    }),
    // createStyleImportPlugin({
    //   resolves: [
    //     ElementPlusResolve(),
    //   ],
    //   libs: [
    //     {
    //       libraryName: 'element-plus',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         console.log('name---',name)
    //         return `element-plus/lib/theme-chalk/${name}.css`;
    //       },
    //     },
    //   ],
    // }),
  ],
  build: {
    rollupOptions: {
      external: [
        "@floating-ui/vue",
        "vue",
        "@vueuse/core",
        "element-plus",
        "@element-plus/icons-vue",
      ],
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
