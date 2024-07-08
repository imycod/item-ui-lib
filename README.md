# unisc-item-ui

这是一个基于vue3的UI框架


## 安装

```shell
pnpm i unisc-item-ui
```

## 使用

### 全局加载

```ts
import itemUI from 'unisc-item-ui-ui'
import 'unisc-item-ui-ui/dist/item-ui.css'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.use(itemUI)
app.mount('#app')
```

### 按需引用

```vue
<script lang="ts" setup>
import { Button } from 'unsic-item-ui'
import 'unisc-item-ui/es/button/style/index.css'
</script>

<template>
  <Button>按钮</Button>
</template>
```

## 开发

```shell
# 安装依赖
pnpm install

# 启动项目
pnpm docs:dev

# 开启单元测试
pnpm test

# 单元测试覆盖率测试
pnpm coverage
```
