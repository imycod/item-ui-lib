<script lang="ts">
/* eslint-disable */
// @ts-nocheck
import { defineComponent,inject, PropType, reactive, watch, ref, onMounted } from 'vue'
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
  setup(_, { emit }) {
    const { cx, c, ce, cm } = useClassname('print-progress')
    
    const [isExpand, expand] = useExpaned()

    const props = inject('props')

    const cls = cx(() => {
      return {
        [c()]: true,
        [c(cm('expanded'))]: isExpand.value,
      }
    })

    const { el, initialValue } = useMyDraggable()

    const { view,abort,open,isVisible } = useProgress({
      emit,
      props,
    })
    const [progress,action]= useProgressData()

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
      reset:action.reset,
      props,
    }
  },
})
</script>

<template>
  <div ref="el" v-show="isVisible" :class="cls" :style="initialValue.style">
    <!-- header -->
    <div :class="c(ce('header'))">
      <div :class="c(ce('header-title'))">{{ props.title }}</div>
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
				{{props.description}}
			</div>
			<el-progress
				:percentage="progress.percentage"
				status="success"
        :show-text="false"
			/>
			<div :class="c(ce('progress-subtest'))">{{props.time}}</div>
		</div>
    <!-- button handle -->
		<div :class="c(ce('footer'))" v-if="isExpand">
			<span :class="c(ce('footer-text'))" @click="abort">Abort Print</span>
			<span :class="c(ce('footer-text'))" @click="view">View Progress</span>
		</div>
  </div>
</template>
