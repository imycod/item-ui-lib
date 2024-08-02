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
    <componnet :is="item.icon"></componnet>
    <span>{{ item.title }}</span>
  </el-menu-item>
  <el-sub-menu :expand-close-icon="Plus" :expand-open-icon="Minus" v-else teleported :index="item.index" v-bind="attrs">
    <template #title>
      <div v-if="toRaw(item.icon)">
        <component :is="item.icon" />
      </div>
      <div> {{ item.title }}</div>
    </template>
    <sidebar-item v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>
</template>
