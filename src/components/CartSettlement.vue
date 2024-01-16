<script setup lang="ts">
// 点击事件，弹出购物车
defineEmits<{
  (e: 'show'): void
}>()
const props = defineProps<{
  shopId: number
}>()
// 获取加购数量
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
const cartStore = useCartStore()
// 徽标
const toCartNum = computed(() => {
  return cartStore.cartGoodsNum(props.shopId)
})
// 获取总价
const TotalNewPrice = computed(() => {
  return cartStore.TotalPrice(Number(props.shopId))
})
// 跳转到支付页面
import { useRouter } from 'vue-router'
const router = useRouter()
const ToPay = () => {
  router.push({
    name: 'orderComfirmation',
    params: {
      shopId: props.shopId
    }
  })
}
</script>
<template>
  <div class="CartSettlement" @click="toCartNum ? $emit('show') : ''">
    <div class="CartSettlement-left">
      <van-icon
        name="shopping-cart"
        size="10.67vw"
        color="var(--theme-color)"
        v-if="toCartNum > 0"
      />
      <van-icon name="shopping-cart" size="10.67vw" color="#b4b9c1" v-else />
      <!-- <img src="@/assets/img/cart/icon_buy.png" alt="" /> -->
      <div class="bagde" v-if="toCartNum > 0">
        <span>{{ toCartNum }}</span>
      </div>
    </div>
    <div class="CartSettlement-mid">
      <div class="price">
        <span class="unit active" v-if="toCartNum > 0">￥</span>
        <span class="unit" v-else>￥</span>
        <div class="newPrice active" v-if="toCartNum > 0">
          {{ TotalNewPrice.newPriceTotal }}
        </div>
        <div class="newPrice" v-else>{{ TotalNewPrice.newPriceTotal }}</div>
        <span class="old-price">￥{{ TotalNewPrice.oldPriceTotal }}</span>
      </div>
      <div class="devery">
        <span class="devery-fee">预估配送费￥2.0</span>
        <span class="devery-pack">打包费￥1.0</span>
      </div>
    </div>

    <div class="CartSettlement-right">
      <div class="pay active" @click.stop="ToPay" v-if="toCartNum > 0">
        结算
      </div>
      <div class="pay" v-else>结算</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.CartSettlement {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  // width: 375px;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  box-shadow: 0px -2px 6px 0px rgba(45, 45, 75, 0.06);
  &-left {
    position: relative;
    padding-right: 12px;
    img {
      width: 40px;
      height: 40px;
    }
    .bagde {
      position: absolute;
      top: 0;
      right: 4px;
      width: 14px;
      height: 14px;
      background: #06d506;
      border-radius: 50%;
      text-align: center;
      line-height: 14px;
      color: #fff;
      span {
        display: inline-block;
        transform: scale(0.85);
      }
    }
  }
  &-mid {
    width: 213px;
    .price {
      display: flex;
      align-items: center;
      height: 25px;
      color: var(--theme-color);
      color: #b4b9c1;
      span {
        display: inline-block;
        transform: scale(0.85);
        height: 100%;
        line-height: 30px;
      }
      .newPrice {
        font-size: 18px;
        font-weight: 600;
      }
      .old-price {
        margin-left: 6px;
        text-decoration: line-through;
      }
    }
    .devery {
      height: 14px;
      line-height: 14px;
      margin-left: -7px;

      span {
        display: inline-block;
        transform: scale(0.85);
        color: #818b98;
      }
    }
    .active {
      color: var(--theme-color);
    }
  }
  &-right {
    .pay {
      width: 80px;
      height: 38px;
      text-align: center;
      line-height: 38px;
      background-color: #b4b9c1;
      color: #fff;
      border-radius: 23px;
    }
    .active {
      background-color: var(--theme-color);
    }
  }
}
</style>
