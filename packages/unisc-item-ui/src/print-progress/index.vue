<template>
  <div>
    <print-progress @view="view" :context="{expand:expandContext}"></print-progress>
    <print-progress-table ref="tableRef" :context="{expand:expandContext}"></print-progress-table>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import PrintProgress from './print-progress.vue'
import PrintProgressTable from './print-progress-table.vue'

import {useExpaned} from "./compoables"

const expandContext = useExpaned()

const tableRef =ref<typeof PrintProgressTable>()
function view(){
  tableRef.value.open()
}
</script>