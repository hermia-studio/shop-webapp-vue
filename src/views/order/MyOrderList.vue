<script setup lang="ts">
import OrderList from './OrderList.vue'
import { getAllOrderList } from '@/api/order'
import type { IOrderItem } from '@/types/order'
import { ref } from 'vue'
import isNull from '@/components/isNull.vue'
import imgSrc from '@/assets/img/cart/pho_norbuy2.png'
import { useRouter } from 'vue-router'
import { useInfoStore } from '@/stores/userInfo'
const router = useRouter()
const userStore = useInfoStore()

// 获取订单列表
let orderList = ref([] as IOrderItem[])
const getOrderData = async () => {
  try {
    orderList.value = await getAllOrderList(userStore.userInfo.userId)
  } catch (error) {
    orderList.value = []
  }
}
// isNull
const onToShop = () => {
  router.push('/')
}
getOrderData()
</script>
<template>
  <div class="myOrderList" v-if="orderList.length > 0">
    <!-- 订单 -->
    <template v-for="(data, index) in orderList" :key="index">
      <OrderList :goodsDate="data" :show="true"></OrderList>
    </template>
  </div>
  <isNull v-else :img="imgSrc" @toShop="onToShop" :imgWid="200">
    <template #text>
      <div class="text">您还没有订单记录</div>
      <div class="text">快去选择喜欢的商品吧</div>
    </template>
  </isNull>
</template>
<style scoped lang="scss">
.myOrderList {
  padding: 0 12px 12px;
  // height: 100vh;
  background-color: #f7f8fa;
  margin-bottom: 50px;
}
.text {
  text-align: center;
  font-size: 14px;
  color: #b4b9c1;
  line-height: 28px;
}
.history {
  height: 28px;
  font-size: 14px;
  color: #818b98;
  line-height: 28px;
  margin-top: 10px;
}
</style>
