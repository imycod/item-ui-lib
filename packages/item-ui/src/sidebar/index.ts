import type { App } from 'vue'
import Sidebar from './index.vue'

Sidebar.install = (app: App) => {
  app.component('ISidebar', Sidebar)
}

export default Sidebar
