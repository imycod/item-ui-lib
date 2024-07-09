<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, reactive, watch, ref } from 'vue'
import { useClassname } from '../utils/use-classname'
import { ElIcon } from "element-plus"
import { ArrowDownBold, ArrowUpBold }  from "@element-plus/icons-vue"
import {useExpaned,useMyDraggable} from "./compoables"


export default defineComponent({
  name: 'IPrintProgress',
  components:{
    ElIcon,
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
    <div class="mt-[16px]">
			<div class="mb-[24px] text-[#B3B4B5] text-[14px]" v-if="isExpand">
				The printing is in progress and is expected to take approximately 600 seconds.
			</div>
			<el-progress
				:percentage="50"
				status="success"
				:show-text="false"
				:indeterminate="true"
				:duration="5"
			/>
			<div class="mt-[8px] text-right text-[#B3B4B5] text-[10px]">500 seconds left</div>
		</div>
    <!-- button handle -->
		<!-- <div class="text-right mt-[30px]" v-if="isExpand">
			<span class="text-red-500 hover:cursor-pointer" @click="abort">Abort Print</span>
			<span class="text-purple-500 ml-10 hover:cursor-pointer" @click="view">View Progress</span>
		</div> -->
  </div>
</template>
