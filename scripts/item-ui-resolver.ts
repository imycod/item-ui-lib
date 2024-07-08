import type { ComponentResolver } from 'unplugin-vue-components'

export function itemUIResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve(name) {
      if (name.startsWith('I')) {
        return {
          name: name.slice(1),
          from: 'unisc-item-ui',
        }
      }
    },
  }
}
