<template>
  <div :class="cls">
    <el-popover
      placement="bottom"
      title="Title"
      :width="200"
      trigger="click"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <notifyIcon style="color: blue;"/>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { useClassname } from "../utils/use-classname";
import notifyIcon from "./assets/notify.svg"

const { cx, c, cm } = useClassname("notify");
const cls = cx(() => {
  return {
    [c()]: true,
  };
});
</script>
