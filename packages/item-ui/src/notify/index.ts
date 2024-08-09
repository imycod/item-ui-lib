import type { App } from 'vue'
import Notify from './index.vue'

Notify.install = (app: App) => {
  app.component('INotify', Notify)
}

export default Notify
