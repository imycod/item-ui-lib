<template>
  {{ cls }}
  <el-dialog :class="cls" v-model="visible" :before-close="beforeClose">
    1
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useExpaned } from "./compoables";
import { useClassname } from '../utils/use-classname'

const props = defineProps({
  // modelValue:{
  //   type:Boolean,
  //   default:false
  // }
  context: {
    type: Object,
    default: () => ({})
  }
})

// const emit = defineEmits(['update:modelValue'])

// const visible = computed({
// 	get() {
// 		return props.modelValue;
// 	},
// 	set(value) {
// 		emit('update:modelValue', value);
// 	},
// });
const { cx, c, ce, cm } = useClassname('print-progress')
const cls = cx(() => {
  return {
    [c()]: true,
    [c(ce('table'))]:true
  }
})

const visible = ref(false);

function open() {
  visible.value = true
}

const [_, expand] = useExpaned()
function beforeClose(done) {
  expand()
  done()
}

defineExpose({
  open
})
</script>