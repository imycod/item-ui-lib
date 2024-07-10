<template>
  <el-dialog :class="cls" v-model="visible" :before-close="beforeClose">
    {{ progress }}
  </el-dialog>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useExpaned, useProgressData} from "./compoables";
import {useClassname} from '../utils/use-classname'

const {cx, c, ce, cm} = useClassname('print-progress')
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
const [progress] = useProgressData()

function beforeClose(done) {
  expand()
  done()
}

defineExpose({
  open
})
</script>