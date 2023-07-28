<template>
  <div class="virtual-scroll-list-outer" ref="outContainer">
    <div class="virtual-scroll-list-inner">
      <slot :view-list="viewData" :item-height="itemHeight"></slot>
    </div>
  </div>
</template>
​
<script lang="ts" setup>
import { ref, reactive, onMounted, PropType, watch, computed } from 'vue'
interface SourceData {
  id: string,
}
const props = defineProps({
  sourceData: {
    type: Object as PropType<SourceData[]>,
    default: () => [{ id: '1' }]
  },
  itemHeight: {
    type: Number,
    default: () => 70
  },
})

//原始数据
const sourceData = computed(() => props.sourceData)
// 最终展示数据
const viewData = reactive<SourceData[]>([])
// 外部容器dom元素
const outContainer = ref<HTMLElement>()
// 内部容器padding-top
const paddingTop = ref('0px')
// 内部容器padding-bottom
const paddingBottom = ref('0px')
//单行高度 可少不可多
const itemHeight = props.itemHeight
//外部容器高度
let outContainerHeight: number

//获取原始数据

//创建虚拟列表
const createVirtualList = () => {
  const scrollTop = outContainer.value?.scrollTop as number
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = startIndex + Math.floor(outContainerHeight / itemHeight)
  paddingTop.value = (startIndex * itemHeight).toString() + 'px'
  // sourceData.length---总数据的长度
  paddingBottom.value = ((sourceData.value.length - endIndex) * itemHeight).toString() + 'px'
  // 清空viewData数据
  viewData.splice(0, viewData.length)
  // 添加可视片段上的数据
  viewData.push(...sourceData.value.slice(startIndex, endIndex + 1))
}

watch(() => sourceData.value, () => {
  if (sourceData.value.length) {
    outContainerHeight = outContainer.value?.clientHeight as number

    createVirtualList()
  }
})

onMounted(async () => {
  // 添加事件监听
  outContainer.value?.addEventListener('scroll', createVirtualList)
})
</script>
​
<style scoped lang='scss'>
.virtual-scroll-list-outer {
  height: 100%;
  overflow-y: scroll;
  width: 70vw;

  .virtual-scroll-list-inner {
    padding-top: v-bind('paddingTop');
    padding-bottom: v-bind('paddingBottom');

  }
}
</style>
​