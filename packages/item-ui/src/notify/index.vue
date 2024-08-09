<template>
  <div :class="cls">
    <el-popover
      placement="bottom-end"
      title="Title"
      :show-arrow="false"
      :width="200"
      trigger="click"
      :offset="16"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <span :class="c('bell')" :style="{ marginBottom: bellLineSpace }">
          <span :class="c('bell', ce('badge'))"></span>
          <notifyIcon :class="c('bell', ce('icon'))" />
        </span>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { useClassname } from "../utils/use-classname";
import notifyIcon from "./assets/notify.svg";

const props = defineProps({
  showHoverBellLine: {
    type: Boolean,
    default: true,
  },
  bellLineSpace: {
    type: String,
    default: "16px",
  },
});

const { cx, c, ce, cm } = useClassname("notify");
const cls = cx(() => {
  return {
    [c()]: true,
    [c(cm("hover"))]: props.showHoverBellLine,
  };
});
</script>
