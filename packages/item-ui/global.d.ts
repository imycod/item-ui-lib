// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Button: typeof import('unisc-item-ui')['Button']
    PrintProgress: typeof import('unisc-item-ui')['PrintProgress']
    Notify: typeof import('unisc-item-ui')['Notify']
  }
}