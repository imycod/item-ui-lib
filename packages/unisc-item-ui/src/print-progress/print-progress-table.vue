<template>
  <el-dialog :class="cls" v-model="visible" width="50%" :before-close="beforeClose">
    <el-table :data="tableData" style="width: 100%;" max-height="450">
      <template v-for="column in columns">
        <el-table-column :prop="column.dataIndex" :width="column.width" :label="column.title" />
      </template>
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
/* eslint-disable */
// @ts-nocheck
import {ref} from "vue";
import {useExpaned, useProgressData} from "./compoables";
import {useClassname} from '../utils/use-classname'
import useTable from "./progress-table.ts";

const {cx, c, ce, cm} = useClassname('print-progress-table')
const cls = cx(() => {
  return {
    [c()]: true,
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
const {columns, tableData} = useTable()
defineExpose({
  open
})
</script>