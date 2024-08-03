<docs>
---
title: 按钮大小
---

你可以通过设置`size`属性来改变按钮的大小，默认为`default`，可选值为`small`和`large`
</docs>

<script setup lang="ts">
</script>

<template>
  <div style="display: flex;gap: 10px">
    <i-button size="small">
      小按钮
    </i-button>
    <i-button>
      正常
    </i-button>
    <i-button size="large">
      大按钮
    </i-button>
  </div>
</template>
