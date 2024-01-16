<script setup lang="ts">
import OrderAddress from './OrderAddress.vue'
import OrderList from './OrderList.vue'
import OrderToPay from './OrderToPay.vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import type { IAddressItem } from '@/types/Address'
import { defaultAddress, getAddress } from '@/api/address'
import { ref, computed } from 'vue'
import type { IOrderItem } from '@/types/order'
import { showConfirmDialog } from 'vant'
import { generateOrder } from '@/api/order'
import { useInfoStore } from '@/stores/userInfo'
const route = useRoute()
const router = useRouter()
const userStore = useInfoStore()
const goback = () => {
  router.back()
}
const { addressId } = route.query
const cartStore = useCartStore()
// 获取购物车中所有被选中的商品
const allCheckedGoodsInfo = cartStore.getAllCheckedGoodsList()
// 刚提交订单时
//--如果有默认地址，就显示出来
let address = ref<IAddressItem | null>(null)
// 获取默认地址
const getDefult = async () => {
  try {
    address.value = await defaultAddress(userStore.userInfo.userId)
  } catch (error) {
    address.value = null
  }
}
const getAddressDateById = async () => {
  try {
    address.value = (await getAddress(
      userStore.userInfo.userId,
      Number(addressId)
    )) as IAddressItem
  } catch (error) {
    address.value = null
  }
}
const getAddressDate = () => {
  // 如果有addressId 就是选择完地址回来的 就要拿到刚刚选的地址
  if (addressId) {
    getAddressDateById()
  } else {
    // 如果没有 则获取默认地址
    getDefult()
  }
  // 都没有就 可以选择地址 显示在页面
}
getAddressDate()
// 获取价格
const orderTotalPrice = computed(() => cartStore.getAllCartPrice())
// 点击结算后 模拟支付 生成订单 删除购物车中已结算商品 跳转到订单页
const onSubmit = async () => {
  // 当前订单信息
  const orderList = [] as IOrderItem[]
  for (let [key, value] of allCheckedGoodsInfo) {
    orderList.push({
      userId: userStore.userInfo.userId,
      shopId: key,
      shopName: value.shopName,
      addressId: Number(address.value?.addressId),
      goodsList: value.goodsList,
      isCanceled: false
    })
  }
  // 模拟用户支付
  await showConfirmDialog({
    title: '订单支付',
    message: '点击取消按钮可取消支付'
  })
    .then(() => {
      // 支付成功
      orderList.forEach((v) => (v.isCanceled = false))
    })
    .catch(() => {
      // 取消支付
      orderList.forEach((v) => (v.isCanceled = true))
    })
  // 生成订单
  await generateOrder(orderList)
  // 将商品从购物车中删除
  cartStore.clearAllCheckedFromCart()
  // 跳转到订单页
  router.push('/order')
}
</script>
<template>
  <div class="cartOrderComfirmPage">
    <!-- 顶部导航 -->
    <div class="topBar">
      <van-nav-bar title="确认订单" left-arrow @click-left="goback">
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <!-- 收货地址 -->
      <OrderAddress :default="address"></OrderAddress>
      <!-- 订单 -->
      <template v-for="item in allCheckedGoodsInfo" :key="item[0]">
        <OrderList :goodsDate="item[1]" :show="false"></OrderList>
      </template>
    </div>
    <!-- 底部结算 -->
    <OrderToPay
      :show="!!address"
      :totalNewPrice="orderTotalPrice.newPriceTotal"
      :totalDiscount="
        orderTotalPrice.oldPriceTotal - orderTotalPrice.newPriceTotal
      "
      @submit="onSubmit"
      >确认支付</OrderToPay
    >
  </div>
</template>
<style lang="scss" scoped>
.cartOrderComfirmPage {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #ff445b 0%, #f7f8fa 252px);
  .content {
    padding: 20px 16px;
    padding-bottom: 70px;
  }
}
</style>
