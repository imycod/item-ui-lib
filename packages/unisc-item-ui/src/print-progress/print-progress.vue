<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, reactive, watch, ref, onMounted } from 'vue'
import { useClassname } from '../utils/use-classname'
import { ElIcon } from "element-plus"
import { ArrowDownBold, ArrowUpBold }  from "@element-plus/icons-vue"
import { useExpaned, useMyDraggable, useProgress } from "./compoables"

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
    context:{
      type:Object,
      default:()=>({})
    }
  },
  setup(props, { emit }) {
    const { cx, c, ce, cm } = useClassname('print-progress')
    
    const [isExpand, expand] = useExpaned()
    // const [isExpand, expand] = props.context['expand'];

    const cls = cx(() => {
      return {
        [c()]: true,
        // [c(cm(props.type))]: !!props.type,
        // [c('size', cm(props.size))]: props.size !== 'default',
        [c(cm('expanded'))]: isExpand.value,
      }
    })

    const { el, initialValue } = useMyDraggable()

    const { view,abort,isVisible } = useProgress({
      context:{
        expand:props.context['expand']
      },
      emit,
    })

    onMounted(()=>{
      isVisible.value = true
    })

    return {
      cls,
      c,
      ce,
      cm,
      isVisible,
      // draggable
      el,
      initialValue,
      // icon
      isExpand,
      expand,
      // button
      view,
      abort
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
				The printing is in progress and is expected to take approximately 600 seconds.
			</div>
			<el-progress
				:percentage="50"
				status="success"
				:show-text="false"
				:indeterminate="true"
				:duration="5"
			/>
			<div :class="c(ce('progress-subtest'))">500 seconds left</div>
		</div>
    <!-- button handle -->
		<div :class="c(ce('footer'))" v-if="isExpand">
			<span :class="c(ce('footer-text'))" @click="abort">Abort Print</span>
			<span :class="c(ce('footer-text'))" @click="view">View Progress</span>
		</div>
  </div>
</template>
