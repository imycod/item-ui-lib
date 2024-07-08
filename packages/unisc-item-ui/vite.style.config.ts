import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import fs from 'fs-extra'

export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        assetFileNames: () => 'index.css',
      },
    },
    lib: {
      entry: 'src/styles.ts',
      formats: ['es'],
      fileName: () => 'index-style.js',
    },
  },
  plugins: [
    {
      name: 'remove:index-style',
      closeBundle() {
        const itemPath = fileURLToPath(new URL('./dist', import.meta.url))
        const stylePath = path.resolve(itemPath, 'index-style.js')
        fs.removeSync(stylePath)
      },
    },
  ],
})
