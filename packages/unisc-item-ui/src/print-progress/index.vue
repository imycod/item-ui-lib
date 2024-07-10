<template>
  <div>
    <print-progress ref="printRef" @view="view"></print-progress>
    <print-progress-table ref="tableRef"></print-progress-table>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import PrintProgress from './print-progress.vue'
import PrintProgressTable from './print-progress-table.vue'

const tableRef =ref<typeof PrintProgressTable>()
const printRef =ref<typeof PrintProgress>()
function view(){
  tableRef.value!.open()
}
function open(isOpen) {
  return printRef.value!.open(isOpen)
}
defineExpose({
  open,
})
</script>