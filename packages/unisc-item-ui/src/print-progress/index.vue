<template>
  <div>
    <print-progress ref="printRef" @view="view"></print-progress>
    <print-progress-table ref="tableRef"></print-progress-table>
  </div>
</template>

<script setup lang="ts">
import {provide, ref} from "vue"
import PrintProgress from './print-progress.vue'
import PrintProgressTable from './print-progress-table.vue'

const props = defineProps({
  title:{
    type: String,
    default: 'Print Task Progress'
  },
  description:{
    type: String,
    default: 'The printing is in progress and is expected to take approximately 600 seconds.'
  },
  time:{
    type: String,
    default: '500 seconds left'
  },
  duration:{
    type: Number,
    default: 1000,
  },
  token:{
    type: String,
    default: '',
  },
  callback:{
    type: [String,Function],
    default: null,
    validator(value){
      return typeof value === 'string' || typeof value === 'function'
    }
  },
  refresh:{
    type: [String,Function],
    default: null,
    validator(value){
      return typeof value === 'string' || typeof value === 'function'
    }
  },
})
provide('props',props)

const tableRef =ref<typeof PrintProgressTable>()
const printRef =ref<typeof PrintProgress>()
function view(){
  tableRef.value!.open()
}

function open(isOpen) {
  return printRef.value!.open(isOpen)
}
function reset(){
  printRef.value!.reset();
}
defineExpose({
  open,
  reset,
})
</script>