<script setup lang="ts">
import { ref } from 'vue'
import MyOrderList from './MyOrderList.vue'
const active = ref(0)
const tabs = [
  {
    id: 1,
    title: '全部',
    component: MyOrderList
  },
  {
    id: 2,
    title: '待付款',
    component: MyOrderList
  },
  {
    id: 3,
    title: '待配送',
    component: MyOrderList
  },
  {
    id: 4,
    title: '配送中',
    component: MyOrderList
  },
  {
    id: 5,
    title: '已完成',
    component: MyOrderList
  }
]
</script>
<template>
  <div class="orderPage">
    <!-- 顶部导航 -->
    <div class="topBar">
      <van-nav-bar title="我的订单">
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <div class="tabBar">
      <van-tabs v-model:active="active" :swipeable="true">
        <template v-for="item in tabs" :key="item.id">
          <van-tab :title="item.title">
            <component :is="item.component"></component>
          </van-tab>
        </template>
      </van-tabs>
    </div>
  </div>
</template>
<style lang="scss">
.orderPage {
  .van-hairline--bottom:after {
    border: 0;
  }
  .van-tabs__wrap {
    height: 44px;
  }
  .van-tabs__nav--line {
    padding: 0;
  }
  .van-tab {
    font-size: 13px;
    color: #051733;
  }
  .van-tab--active {
    color: var(--theme-color);
  }
  .van-tabs__line {
    width: 30px;
    height: 3px;
    background: var(--theme-color);
    border-radius: 2px;
    bottom: 0;
  }
}
</style>
<style scoped lang="scss">
.orderPage {
  height: 100vh;
  background-color: #f7f8fa;
  overflow-y: scroll;
}
</style>
