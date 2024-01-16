<script setup lang="ts">
import { ref } from 'vue'
import HistoryView from './HistoryView.vue'
import shopItem from '@/components/shopItem.vue'
import { searchShopList } from '@/api/search'
import { useLocalStorage } from '@vueuse/core'
import type {
  ISearchShopItem,
  ISearchShopListData,
  IHistoryItem
} from '@/types/search'
import { watchEffect } from 'vue'

// 属性
const keyWord = ref('') // 搜索框 关键词
const page = ref(0)
const limit = ref(10)
const shopList = ref([] as ISearchShopItem[])
// 历史记录
const historyList = useLocalStorage<IHistoryItem[]>('historyList', [])
// 上拉加载更多
const loading = ref(false)
const finished = ref(false)
const error = ref(false)
const searchState = ref(false)
// 下拉刷新
const refreshing = ref(false)

// 事件
// 关闭搜索页
const emit = defineEmits<{
  (e: 'close'): void
}>()
const onClose = () => {
  // 清空搜索数据
  shopList.value = []
  // 将搜索框内容清空
  keyWord.value = ''
  // 关闭搜索框
  emit('close')
}

// 根据关键词搜索商品
const onSearch = (keyword: string) => {
  if (!keyword) return
  // 这两个定时器 使搜索一直有效
  setTimeout(() => {
    //点击搜索后开始调用onLoad
    searchState.value = false
  }, 0)
  setTimeout(() => {
    //点击搜索后开始调用onLoad
    searchState.value = true
  }, 10)
  // 每一次搜索都是新的
  page.value = 0
  finished.value = false
  shopList.value = []
  // console.log('搜索', finished.value, searchState.value)
  // 将关键词添加进历史记录
  addHistory(keyword)
}
// 上拉加载更多
const onLoad = async () => {
  if (refreshing.value) {
    shopList.value = []
    refreshing.value = false // 下拉刷新结束
  }
  page.value++
  // console.log('上拉' + page.value)
  let result: ISearchShopListData = {} as ISearchShopListData
  try {
    // 拿到关键词 发起请求 获取对应内容
    result = await searchShopList(keyWord.value, page.value, limit.value)
    shopList.value = shopList.value.concat(result.data)
    // 数据全部加载完成时
    if (shopList.value.length >= result.total) {
      finished.value = true
    }
  } catch (err) {
    error.value = true //加载失败
    page.value = 0 //出错后再加载 重新加载第一页数据
  }
  // 加载完之后 不管是否有新内容都要停止加载
  loading.value = false
}
// 下拉刷新
const onRefresh = () => {
  // 加载最新一页
  page.value = 0
  // 开始新一轮搜索
  finished.value = false
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}

// 拿到历史记录搜索
const onhistoryKey = (keyword: string) => {
  keyWord.value = keyword
  onSearch(keyword)
}
// 添加历史记录
const addHistory = (keyword: string) => {
  // 如果有一样的就删除
  const index = historyList.value.findIndex((v) => v.keyword === keyword)
  if (index !== -1) {
    historyList.value.splice(index, 1)
  }
  // 不管有无一样的都将它添加进历史记录，新的加在最前面
  historyList.value.unshift({
    id: Date.now(),
    keyword
  })
  // 只显示最新的20条
  historyList.value = historyList.value.slice(0, 5)
}
// 删除历史记录
const deleteHistory = () => {
  historyList.value = []
  console.log('删除')
}
// 创建一个侦听器
watchEffect(() => {
  if (!keyWord.value) {
    shopList.value = []
    // 输入框无内容时 不调用onload 使刚进入搜索页时不加载数据
    searchState.value = false
  }
})
</script>
<template>
  <div class="searchPage">
    <div class="topbar">
      <van-nav-bar title="搜索" @click-left="onClose">
        <template #left>
          <van-icon name="cross" color="#000" size="4.26vw" />
        </template>
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 搜索框 -->
    <div class="searchInput">
      <van-search
        v-model.trim="keyWord"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        autocomplete="off"
      >
        <template #left-icon>
          <span class="iconfont icon-sousuo"></span>
        </template>
        <template #right-icon>
          <div class="searchBtn" @click="onSearch(keyWord)">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 历史记录 -->
    <HistoryView
      v-if="!searchState"
      @historyKey="onhistoryKey"
      @del-history="deleteHistory"
      :historyList="historyList"
    ></HistoryView>
    <div class="shopList" v-if="searchState">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-model:error="error"
          error-text="请求失败，点击重新加载"
          offset="100"
        >
          <!-- 商店列表 -->
          <div
            class="shopList-Item"
            v-for="shopItem in shopList"
            :key="shopItem.shopId"
          >
            <shopItem :shopItemData="shopItem"></shopItem>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<style>
.searchInput {
  /* 搜索框样式重置 */
  --van-search-padding: 0;
  --van-search-content-background: #f5f6f7;
  --van-padding-sm: 20px;
  --van-padding-base: 4px;
  --van-radius-sm: 22px;
  /* 去掉顶部导航边框线 */
  .van-hairline--bottom:after {
    border: 0;
  }
  .van-field__control {
    color: #051733;
  }
}
</style>
<style scoped lang="scss">
.searchPage {
  width: 100%;
  height: 100vh;
  background-color: #f5f6f7;
  .searchInput {
    padding: 4px 16px;
    background-color: #fff;
    .icon-sousuo {
      color: var(--theme-color);
    }
    .searchBtn {
      width: 50px;
      height: 26px;
      border-radius: 23px;
      background: var(--theme-color);
      font-size: 12px;
      color: #ffffff;
      text-align: center;
      line-height: 26px;
    }
  }
}
</style>
