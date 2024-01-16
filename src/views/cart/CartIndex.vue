<script setup lang="ts">
import CartList from './CartList.vue'
import OrderToPayVue from '../order/OrderToPay.vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import isNull from '@/components/isNull.vue'
import imgSrc from '@/assets/img/cart/pho_norbuy.png'
const router = useRouter()
const cartStore = useCartStore()
// 获取购物车列表数据
const allCartList = cartStore.getCartList()
const onSubmit = () => {
  router.push('/order/comfirmation')
}
// 获取结算总价
const totalPrice = computed(() => cartStore.getAllCartPrice())
// isNull
const onToShop = () => {
  router.push('/')
}
const toOrder = () => {
  router.push('/order')
}
</script>
<template>
  <div class="cartPage">
    <!-- 顶部导航 -->
    <div class="topBar">
      <van-nav-bar title="购物车">
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <div class="cartMain">
      <template v-if="allCartList.size > 0">
        <CartList
          v-for="item in allCartList"
          :key="item[0]"
          :data="item"
        ></CartList>
        <!-- 底部结算 -->
        <OrderToPayVue
          :totalNewPrice="totalPrice.newPriceTotal"
          :totalDiscount="totalPrice.oldPriceTotal - totalPrice.newPriceTotal"
          :fixBottom="49"
          :show="true"
          @submit="onSubmit"
          >结算</OrderToPayVue
        >
      </template>
      <isNull v-else :img="imgSrc" @toShop="onToShop" :imgWid="295">
        <template #text>
          <div class="text">您还没有购物记录</div>
          <div class="text">快去选择喜欢的商品吧</div>
        </template>
        <template #history>
          <div class="history" @click="toOrder">历史订单</div>
        </template>
      </isNull>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cartPage {
  height: 100vh;
  overflow-y: scroll;
  background-color: #f7f8fa;
  .cartMain {
    padding-bottom: 120px;
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
}
</style>
