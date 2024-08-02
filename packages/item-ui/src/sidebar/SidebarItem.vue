<script setup lang="ts">
import {
  type PropType,
  type CSSProperties,
  ref,
  toRaw,
  computed,
  useAttrs
} from "vue";
import {
  Minus,
  Plus,
} from '@element-plus/icons-vue'

const attrs = useAttrs();

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
});

</script>

<template>
  <el-menu-item v-if="!item.children" :index="item.index">
    <img :src="item.icon">
    <span>{{ item.title }}</span>
  </el-menu-item>
  <el-sub-menu :expand-close-icon="Plus" :expand-open-icon="Minus" v-else teleported :index="item.index" v-bind="attrs">
    <template #title>
      <img :src="item.icon">
      <div> {{ item.title }}</div>
    </template>
    <sidebar-item v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>
</template>
