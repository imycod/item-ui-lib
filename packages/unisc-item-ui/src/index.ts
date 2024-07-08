import type { Plugin } from 'vue'
import pkg from '../package.json'
import * as components from './components'

export * from './components'

export default {
  install(app) {
    Object.entries(components).forEach(([_componentName, component]) => {
      if ((component as any).install)
        app.use(component as any)
    })
  },
  version: pkg.version,
} as Plugin
