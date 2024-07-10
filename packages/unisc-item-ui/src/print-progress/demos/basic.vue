<docs>
---
title: 基本使用
---

这是一个`print-progress`按钮最基本的使用例子
</docs>

<script setup lang="ts">
import {ref,onMounted,reactive} from "vue"

const printRef = ref(null)

const progress = ref(null)
const isOpen = ref(false)
function open() {
    // or if progress.status === 'padding' isOpen.value = true,
    // else Ref type boolean inside to open
    progress.value = printRef.value!.open(isOpen)
}

onMounted(()=>{
  open()
})
</script>

<template>
  <div>
    <div>isOpen: {{isOpen}}</div> 
    <div>{{progress}}</div>
    <div>
      <i-button type="primary" @click="open" :disabled="isOpen">打开print progress进度框</i-button>
      <i-print-progress ref="printRef"/>
    </div>
  </div>
</template>
