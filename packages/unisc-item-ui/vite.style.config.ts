/* eslint-disable */
// @ts-nocheck
import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import fs from "fs-extra";
import {createStyleImportPlugin, ElementPlusResolve} from "vite-plugin-style-import";

export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: () => "index.css",
      },
    },
    lib: {
      entry: "src/styles.ts",
      formats: ["es"],
      fileName: () => "index-style.js",
    },
  },
  plugins: [
    {
      name: "remove:index-style",
      closeBundle() {
        const itemPath = fileURLToPath(new URL("./dist", import.meta.url));
        const stylePath = path.resolve(itemPath, "index-style.js");
        fs.removeSync(stylePath);
      },
    },
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
});
