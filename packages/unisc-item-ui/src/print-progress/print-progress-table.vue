<template>
  <el-dialog :class="cls" v-model="visible" :before-close="beforeClose">
    {{ progress }}
  </el-dialog>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useExpaned, useProgressData} from "./compoables";
import {useClassname} from '../utils/use-classname'

const {cx, c, ce, cm} = useClassname('print-progress-table')
const cls = cx(() => {
  return {
    [c()]: true,
    [c(ce('table'))]: true
  }
})

const visible = ref(false);

function open() {
  visible.value = true
}

const [_, expand] = useExpaned()
const [progress, action] = useProgressData();

function beforeClose(done) {
  expand()
  // 1.查看view时，队列循环结束了，此时为了第二个table能够正常显示，没有在stop reset
  // action.reset()
  done()
}

defineExpose({
  open
})
</script>