<template>
  <el-menu :class="cls" v-bind="$attrs">
    <SubMenuItem v-for="routes in data" :key="routes.path" :item="routes"></SubMenuItem>
  </el-menu>
</template>

<script setup lang="ts">
import { useClassname } from '../utils/use-classname'
import SubMenuItem from "./SidebarItem.vue"
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const { cx, c, ce, cm } = useClassname('sidebar')
const cls = cx(() => {
  return {
    [c()]: true,
  }
})
</script>