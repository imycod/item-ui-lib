<script setup lang="ts">
import { useAttrs } from "vue";
import { Minus, Plus } from "@element-plus/icons-vue";

const attrs = useAttrs();

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <el-menu-item v-if="!item.children" :index="item.index">
    <el-icon>
      <component v-if="item.icon" :is="item.icon"></component>
      <img v-else :src="item.src" />
    </el-icon>
    <span>{{ item.title }}</span>
  </el-menu-item>
  <el-sub-menu
    v-else
    :expand-close-icon="Plus"
    :expand-open-icon="Minus"
    teleported
    :index="item.index"
    v-bind="attrs"
  >
    <template #title>
      <el-icon>
        <component v-if="item.icon" :is="item.icon"></component>
        <img v-else :src="item.src" />
      </el-icon>
      <div>{{ item.title }}</div>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    />
  </el-sub-menu>
</template>
