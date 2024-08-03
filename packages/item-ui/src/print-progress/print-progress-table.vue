<template>
  <el-dialog :class="cls" v-model="visible" :title="props.title" width="50%" :before-close="beforeClose">
    <div :class="c(ce('row'))">
      <span :class="c(ce('row-description'))">{{ props.description }}</span>
      <div>
        <el-button size="small" :class="c(ce('row-orange'))">Abort All</el-button>
        <el-button size="small" :class="c(ce('row-orange'))">Abort</el-button>
      </div>
    </div>
    <el-table ref="tableRef" @selection-change="selectionChange" :data="tableData" style="width: 100%;" max-height="450">
      <el-table-column type="selection" width="55" />
      <template v-for="column in columns">
        <el-table-column :class-name="column.dataIndex" :sortable="column.sortable" :prop="column.dataIndex" :width="column.width" :label="column.title" />
      </template>
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
/* eslint-disable */
// @ts-nocheck
import {inject, ref} from "vue";
import {useExpaned, useProgressData} from "./compoables";
import {useClassname} from '../utils/use-classname'
import useTable from "./progress-table.ts";

const props = inject('props')

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

const tableRef = ref<InstanceType<typeof ElTable>>()
const {columns, tableData,selection,selectionChange,toggleSelection} = useTable(tableRef)

const [progress, action] = useProgressData(props);

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