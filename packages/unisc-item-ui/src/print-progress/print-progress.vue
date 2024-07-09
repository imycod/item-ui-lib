<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, reactive, watch, ref } from 'vue'
import { useClassname } from '../utils/use-classname'
import { useDraggable } from '@vueuse/core'
import { ElIcon } from "element-plus"
import { ArrowDownBold, ArrowUpBold }  from "@element-plus/icons-vue"
import { title } from 'process'

function useMyDraggable() {
  const el = ref<HTMLElement | null>(null)
  const initialValue = reactive({
    x: 0,
    y: 50,
    style: ''
  })
  const { style } = useDraggable(el, {
    initialValue: initialValue
  })
  watch(style, (v) => {
    initialValue.style = v
  })
  return {
    el,
    initialValue
  }
}

function useExpaned() {
  const isExpand = ref(false)
  const doSwitch = () => {
    isExpand.value = !isExpand.value
  }
  return [
    isExpand,
    doSwitch
  ]
}

export default defineComponent({
  name: 'IPrintProgress',
  components: {
    'el-icon': ElIcon,
    ArrowDownBold,
    ArrowUpBold
  },
  props: {
    type: {
      type: String as PropType<'default' | 'primary' | 'dashed'>,
      default: 'default',
    },
    title:{
      type: String,
      default: 'Print Task Progress'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'default' | 'small' | 'large'>,
      default: 'default',
    },
  },
  setup(props, { emit }) {
    const { cx, c, cm } = useClassname('print-progress')
    const cls = cx(() => {
      return {
        [c()]: true,
        [c(cm(props.type))]: !!props.type,
        [c('size', cm(props.size))]: props.size !== 'default',
      }
    })

    const { el, initialValue } = useMyDraggable()
    const [isExpand, doSwitch] = useExpaned()

    return {
      // draggable
      cls,
      el,
      initialValue,
      // icon
      isExpand,
      doSwitch,
    }
  },
})
</script>

<template>
  <div ref="el" :class="[cls, { 'expanded': isExpand }]" :style="initialValue.style">
    <!-- header -->
    <div class="header">
      <h4 class="title">{{ title }}</h4>
      <div class="icon">
        <el-icon v-if="!isExpand" @click="doSwitch">
          <ArrowDownBold />
        </el-icon>
        <el-icon v-else @click="doSwitch">
          <ArrowUpBold />
        </el-icon>
      </div>
    </div>
    <!-- progress -->
     
  </div>
</template>
