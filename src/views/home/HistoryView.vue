<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IHistoryItem } from '@/types/search'
const emit = defineEmits<{
  (e: 'historyKey', value: string): void
  (e: 'del-history'): void
}>()
// 历史记录类型
interface IProps {
  historyList: IHistoryItem[]
}
// 接收父组件传来的历史记录
const props = defineProps<IProps>()

const showAll = ref(false)
const showHistoryList = computed(() => {
  if (showAll.value) {
    // 展示全部
    return props.historyList
  } else {
    // 展示最新8条
    return props.historyList.slice(0, 8)
  }
})

// 点击关键字将其传给父组件
const ClickKeyword = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const tagName = target.tagName.toLowerCase()
  if (tagName === 'span') {
    emit('historyKey', target.innerText)
  }
}
</script>
<template>
  <div class="historyPage" v-if="historyList.length !== 0">
    <div class="history-title">
      <div class="history-title-text">历史记录</div>
      <van-icon name="delete" size="4.26vw" @click="$emit('del-history')" />
    </div>
    <div class="history-content">
      <TransitionGroup>
        <span
          v-for="item in showHistoryList"
          :key="item.id"
          @click="ClickKeyword"
          >{{ item.keyword }}</span
        >
      </TransitionGroup>
      <!-- 展开 -->
      <span v-if="!showAll && historyList.length > 8" @click="showAll = true">
        <van-icon name="arrow-down" />
      </span>
      <!-- 缩小 -->
      <span v-if="showAll" @click="showAll = false">
        <van-icon name="arrow-up" />
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.historyPage {
  box-sizing: border-box;
  background-color: #fff;
  min-height: 100px;
  margin: 12px 16px;
  border-radius: 6px;
  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    padding: 0 10px;
    &-text {
      font-size: 14px;
      font-weight: bold;
      color: #000;
    }
  }
  .history-content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 6px 12px 6px;
    span {
      margin: 4px;
      padding: 7px;
      border-radius: 3px;
      background-color: #f5f6f7;
    }
    .v-enter-from,
    .v-enter-to {
      opacity: 0;
    }
    .v-move,
    .v-enter-active,
    .v-leave-active {
      transition: all 0.3s ease;
    }
  }
}
</style>
