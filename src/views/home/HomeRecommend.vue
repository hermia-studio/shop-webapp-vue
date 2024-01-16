<script setup lang="ts">
import { ref } from 'vue'
import RecommendItem from '@/components/RecommendItem.vue'
import { shallowRef } from 'vue'

const categoryList = shallowRef([
  { id: 1, title: '附近推荐', category: 0, component: RecommendItem },
  { id: 2, title: '甜点饮品', category: 1, component: RecommendItem },
  { id: 3, title: '超市便利', category: 2, component: RecommendItem },
  { id: 4, title: '蔬菜水果', category: 3, component: RecommendItem },
  { id: 5, title: '看病买药', category: 4, component: RecommendItem },
  { id: 6, title: '景点游玩', category: 5, component: RecommendItem },
  { id: 7, title: '酒店民宿', category: 6, component: RecommendItem },
  { id: 8, title: '丽人美发', category: 7, component: RecommendItem }
])
const active = ref(0)
</script>
<template>
  <div class="homeRecommend">
    <div class="category">
      <van-tabs v-model:active="active" sticky :offset-top="46">
        <van-tab
          v-for="item in categoryList"
          :key="item.id"
          :title="item.title"
        >
          <KeepAlive>
            <component
              :is="item.component"
              :category="item.category"
            ></component>
          </KeepAlive>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<style>
/* 组件样式重置 */
.homeRecommend {
  .van-tab {
    align-items: flex-start;
    /* tab标签栏高度 */
    height: 26px;
    padding: 0;
    margin-right: 24px;
  }
  /* tab标签文字 */
  --van-tab-active-text-color: var(--theme-color);
  --van-tab-text-color: #818b98;
  --van-tab-font-size: 14px;
  --van-font-bold: none;
  .van-tabs__nav {
    background-color: #f7f8fa;
  }
  .van-tabs__line {
    width: 28px;
    top: 24px;
    margin-left: -2px;
  }
  .van-tabs__wrap {
    height: 26px;
  }
  .van-sticky--fixed {
    z-index: 80;
    padding: 5px 0;
    background-color: #f7f8fa;
  }
  .van-tabs__nav--line {
    height: 26px;
    padding: 0;
  }
  /* 底部横线 */
  --van-tabs-bottom-bar-width: 28px;
  --van-tabs-bottom-bar-height: 2px;
  --van-tabs-bottom-bar-color: var(--theme-color);
}
</style>
<style scoped lang="scss">
.homeRecommend {
  width: 343px;
  min-height: 100px;
  margin: 0 auto 62px;

  .category {
    height: 26px;
  }
  .van-tab__panel {
    background-color: #f7f8fa;
    margin-top: 8px;
    // 上拉加载更多 才能显示出来
    padding-bottom: 40px;
  }
}
</style>
