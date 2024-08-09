<script setup lang="ts">
import iconSvg from "./platform.svg"
const data = [
  {
    index: "1",
    title: "首页",
    icon: iconSvg,
    path: "/"
  },
  {
    index: "2",
    title: "表格",
    icon: '',
    path: "/table"
  },
  {
    index: "3",
    title: "表单",
    icon: 'platformIcon',
    path: "/form",
    children:[
      {
        index: "3-1",
        title: "表单1",
        icon: "FormIcon",
        path: "/form/form1",
      },
      {
        index: "3-2",
        title: "表单2",
        icon: "FormIcon",
        path: "/form/form2"
      }
    ]
  },
  {
    index: "4",
    title: "打印",
    icon: "PrinterIcon",
    path: "/print"
  },
  {
    index: "5",
    title: "打印进度",
    icon: "PrinterIcon",
    path: "/print-progress"
  }
]
</script>

<template>
  <i-sidebar class="dark:bg-red-500" :data="data"></i-sidebar>
</template>