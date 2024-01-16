<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const AsyncGoodsList = defineAsyncComponent(
  () => import('./AsyncGoodsList.vue')
)
// 计算scroll-wrapper高度 浏览器高度-tab-购物车
const height = document.documentElement.clientHeight - 78 + 'px'
</script>
<template>
  <div class="AllGoodsPage">
    <div class="goods-menu">
      <van-sticky :offset-top="28">
        <div class="scroll-wrapper">
          <div id="menu"></div>
        </div>
      </van-sticky>
    </div>
    <div class="goodsList">
      <AsyncGoodsList></AsyncGoodsList>
    </div>
  </div>
</template>

<style lang="scss">
.AllGoodsPage {
  /* 异步组件样式 */
  .van-index-bar__sidebar {
    position: relative;
    top: 0;
    left: 0;
    transform: translateY(0);
    background-color: #f2f3f5;
    padding-bottom: 30px;
  }
  .van-index-bar__index {
    box-sizing: border-box;
    width: 86px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    padding: 0;
    color: #818b98;
    font-size: 12px;
  }
  .van-index-bar__index--active {
    color: var(--theme-color);
    background-color: #fff;
  }
  .van-index-anchor {
    font-size: 12px;
    color: #818b98;
    padding: 0;
    height: 26px;
    line-height: 17px;
    padding-bottom: 9px;
  }
  .van-index-anchor--sticky {
    top: 7px;
    left: 0px;
  }
  // 去掉滚动条
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
}
</style>
<style scoped lang="scss">
.AllGoodsPage {
  display: flex;
  background-color: #fff;
  .goods-menu {
    position: static;
    top: 0;
    width: 86px;
    height: v-bind(height);
    // min-height: 100px;
    background-color: #f2f3f5;
  }
  .goodsList {
    position: relative;
    flex: 1;
    height: v-bind(height);
    overflow-y: scroll;
    background-color: fff;
    padding: 8px 16px 0 10px;
  }
  .scroll-wrapper {
    overflow: scroll;
    height: v-bind(height);
  }
}
</style>
