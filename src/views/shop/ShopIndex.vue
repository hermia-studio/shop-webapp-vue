<script setup lang="ts">
import ShopTop from './ShopTop.vue'
import { useRouter } from 'vue-router'
import AllGoods from './AllGoods.vue'
import ShopKeeper from './ShopKeeper.vue'
import ShopEvaluate from './ShopEvaluate.vue'
import CartItem from '@/components/CartItem.vue'
import { ref } from 'vue'
const router = useRouter()
const goback = () => {
  router.back()
}
// 商品信息分类
const cartInfo = [
  {
    id: 1,
    title: '全部商品',
    component: AllGoods
  },
  {
    id: 2,
    title: '评价',
    component: ShopEvaluate
  },
  {
    id: 3,
    title: '商家信息',
    component: ShopKeeper
  }
]
// 当前索引
const active = ref(0)
</script>

<template>
  <!-- 顶部导航 -->
  <div class="topBar">
    <van-nav-bar title="商家详情" left-arrow @click-left="goback">
      <template #right>
        <van-icon name="ellipsis" size="7.46vw" color="#000" />
      </template>
    </van-nav-bar>
  </div>
  <div class="shopPage">
    <!-- 店铺信息 -->
    <ShopTop></ShopTop>
    <!-- 商品信息分类 -->
    <div class="shopInfo">
      <van-tabs v-model:active="active" :swipeable="true">
        <template v-for="item in cartInfo" :key="item.id">
          <van-tab :title="item.title">
            <component :is="item.component"></component>
          </van-tab>
        </template>
      </van-tabs>
    </div>
    <!-- 底部购物车 -->
    <div class="shopCart">
      <CartItem></CartItem>
    </div>
  </div>
</template>
<style>
.shopPage {
  .van-tab {
    flex: 0 0 auto;
    align-items: flex-start;
    /* tab标签栏高度 */
    height: 28px;
    margin-right: 80px;
  }
  /* tab标签文字 */
  --van-tab-active-text-color: var(--theme-color);
  --van-tab-text-color: #697485;
  --van-tab-font-size: 14px;
  --van-font-bold: none;
  .van-tabs__nav {
    background-color: #fff;
    padding-left: 16px;
  }
  .van-tabs__line {
    top: 24px;
  }
  .van-tabs__wrap {
    height: 28px;
    position: sticky;
    top: 0;
    z-index: 90;
  }
  .van-tabs__nav--line {
    height: 28px;
    padding-bottom: 0;
  }
  /* 底部横线 */
  --van-tabs-bottom-bar-width: 28px;
  --van-tabs-bottom-bar-height: 2px;
  --van-tabs-bottom-bar-color: var(--theme-color);
}
</style>
<style scoped lang="scss"></style>
