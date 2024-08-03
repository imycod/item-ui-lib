import type { App } from 'vue'
import PrintProgress from './index.vue'

PrintProgress.install = (app: App) => {
  app.component('IPrintProgress', PrintProgress)
}

export default PrintProgress
