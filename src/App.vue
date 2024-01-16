<script setup lang="ts">
import { watch } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const active = ref(0)
// 调整tab
const pathMap = new Map([
  ['/', 0],
  ['/cart', 1],
  ['/order', 2],
  ['/my', 3]
])
// 侦听访问路径的变化
watch(
  () => route.fullPath,
  (v) => {
    active.value = pathMap.get(v) || 0
  }
)
</script>
<template>
  <div class="appPage">
    <router-view></router-view>
    <van-tabbar
      v-model="active"
      active-color="var(--theme-color)"
      inactive-color="#24447E"
    >
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="orders-o" to="/order">订单</van-tabbar-item>
      <van-tabbar-item icon="contact-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style lang="scss">
.appPage {
  /* nav-bar  顶部导航*/
  --van-nav-bar-icon-color: #000;
  --van-nav-bar-arrow-size: 24px;
  --van-nav-bar-height: 44px;
  --van-nav-bar-title-font-size: 18px;
  --van-nav-bar-title-text-color: #000;
  font-family: PingFangSC-Regular;
  .van-nav-bar__title {
    height: 44px;
    line-height: 44px;
  }
  /* 底部导航 */
  --van-tabbar-item-font-size: 12px;
  .van-tabbar {
    z-index: 91;
  }
  .van-tabbar-item__icon {
    font-size: 22px;
  }
}
</style>
