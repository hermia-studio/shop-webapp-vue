<script setup lang="ts">
import { ref } from 'vue'
import type { ISearchShopListData, ISearchShopItem } from '@/types/search'
import { getRecommend } from '@/api/home'
import shopItem from './shopItem.vue'

const props = defineProps<{
  category: number
}>()
const category = props.category
// 导入数据
let recommendList = ref([] as ISearchShopItem[])
const page = ref(0)
const limit = ref(10)
const getRecommendList = async () => {
  let result: ISearchShopListData = {} as ISearchShopListData
  if (refreshing.value) {
    refreshing.value = false
    // 清空数据列表
    recommendList.value = []
  }
  try {
    // 获取数据
    result = await getRecommend(category, page.value, limit.value)
    recommendList.value = recommendList.value.concat(result.data)
    // 判断数据是否全部加载完成
    if (recommendList.value.length >= result.total) {
      finished.value = true
    }
  } catch (err) {
    // 加载失败
    page.value = 0
    error.value = true
  } finally {
    // 无论是否加载成功 都要改loading
    loading.value = false
  }
}
// 上拉加载更多
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const onLoad = () => {
  page.value++
  // 上拉 加载更多数据
  getRecommendList()
}
// 下拉刷新
const refreshing = ref(false)
const onRefresh = () => {
  // 加载第一页
  page.value = 0
  finished.value = false
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}
</script>
<template>
  <div class="recommendPage">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        offset="100"
        @load="onLoad"
      >
        <template v-for="item in recommendList" :key="item.shopId">
          <shopItem :shopItemData="item"></shopItem>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<style scoped lang="scss">
.recommendPage {
  // 下拉刷新必备条件
  height: 600px;
  overflow: auto;
}
</style>
