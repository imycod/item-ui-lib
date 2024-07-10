<script lang="ts">
/* eslint-disable */
// @ts-nocheck
import type { PropType } from 'vue'
import { defineComponent, reactive, watch, ref, onMounted } from 'vue'
import { useClassname } from '../utils/use-classname'
import { ElIcon } from "element-plus"
import { ArrowDownBold, ArrowUpBold }  from "@element-plus/icons-vue"
import { useExpaned, useMyDraggable, useProgress, useProgressData } from "./compoables"

export default defineComponent({
  name: 'IPrintProgress',
  components:{
    ElIcon,
    ArrowDownBold,
    ArrowUpBold
  },
  props: {
    title:{
      type: String,
      default: 'Print Task Progress'
    },
    text:{
      type: String,
      default: 'The printing is in progress and is expected to take approximately 600 seconds.'
    },
    subText:{
      type: String,
      default: '500 seconds left'
    },
    duration:{
      type: Number,
      default: 1000,
    },
    type: {
      type: String as PropType<'default' | 'primary' | 'dashed'>,
      default: 'default',
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
    const { cx, c, ce, cm } = useClassname('print-progress')
    
    const [isExpand, expand] = useExpaned()

    const cls = cx(() => {
      return {
        [c()]: true,
        // [c(cm(props.type))]: !!props.type,
        // [c('size', cm(props.size))]: props.size !== 'default',
        [c(cm('expanded'))]: isExpand.value,
      }
    })

    const { el, initialValue } = useMyDraggable()

    const { view,abort,open,isVisible } = useProgress({
      emit,
      props,
    })
    const [progress]= useProgressData()

    return {
      cls,
      c,
      ce,
      cm,
      // draggable
      el,
      initialValue,
      // icon
      isExpand,
      expand,
      // progress
      isVisible,
      progress,
      // progress - button
      view,
      abort,
      open,
    }
  },
})
</script>

<template>
  <div ref="el" v-if="isVisible" :class="cls" :style="initialValue.style">
    <!-- header -->
    <div :class="c(ce('header'))">
      <h4 :class="c(ce('header-title'))">{{ title }}</h4>
      <div :class="c(ce('header-icon'))">
        <el-icon v-if="!isExpand" @click="expand">
          <ArrowDownBold />
        </el-icon>
        <el-icon v-else @click="expand">
          <ArrowUpBold />
        </el-icon>
      </div>
    </div>
    <!-- progress -->
    <div :class="c(ce('progress'))">
			<div :class="c(ce('progress-text'))" v-if="isExpand">
				{{text}}
			</div>
			<el-progress
				:percentage="progress.percentage"
				status="success"
        :show-text="false"
			/>
			<div :class="c(ce('progress-subtest'))">{{subText}}</div>
		</div>
    <!-- button handle -->
		<div :class="c(ce('footer'))" v-if="isExpand">
			<span :class="c(ce('footer-text'))" @click="abort">Abort Print</span>
			<span :class="c(ce('footer-text'))" @click="view">View Progress</span>
		</div>
  </div>
</template>
