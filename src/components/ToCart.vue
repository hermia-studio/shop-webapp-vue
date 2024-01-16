<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { IGood } from '@/types/goods'
import { computed } from 'vue'
const cartStore = useCartStore()
interface IProps {
  goods: IGood
  shopId: number
  shopName: string
}
// 接收props数据
const props = defineProps<IProps>()
// 获取商品的加购数量
const cartCount = computed(() =>
  cartStore.getGoodsCartInfo(props.shopId, props.goods.goodsId)
)
// 加减
const minCount = () => {
  cartStore.reduceProductFromCart(props.shopId, props.goods.goodsId)
}
const AddCount = () => {
  cartStore.pushProductToCart(props.shopId, props.shopName, props.goods)
}
</script>
<template>
  <div class="toCartPage">
    <TransitionGroup>
      <div class="minuCart" @click.stop="minCount" v-if="cartCount > 0">
        <van-icon name="minus" color="var(--theme-color)" />
      </div>
      <div class="count" v-if="cartCount > 0">{{ cartCount }}</div>
    </TransitionGroup>
    <div class="addCart" @click.stop="AddCount">
      <van-icon name="plus" color="#fff" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.toCartPage {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 18px;
  line-height: 18px;
  .minuCart,
  .addCart {
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 17px;
    border: 1px solid #000;
    border-radius: 50%;
    border-color: var(--theme-color);
  }
  .minuCart {
    background-color: #fff;
  }
  .addCart {
    background-color: var(--theme-color);
  }
  .count {
    width: 16px;
    text-align: center;
    color: #051733;
    font-size: 13px;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
}
</style>
