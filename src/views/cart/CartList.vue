<script setup lang="ts">
import CartGoodsItem from '@/components/CartGoodsItem.vue'
import type { IShopCartInfos } from '@/types/goods'
import { computed } from 'vue'
// const goods = {
//   goodsId: '10001',
//   name: 'B级-进口香蕉2根/300-350g',
//   imgUrl: '/images/goods/type1-02.jpg',
//   sellCount: 27,
//   rating: '100%',
//   price: 3.9,
//   oldPrice: 4.9,
//   tips: ['香甜软糯', '袋装', '国产'],
//   discount: {
//     type: 1,
//     value: 2,
//     limitCount: 1
//   },
//   cartCount: 0,
//   checked: true
// }
interface IProps {
  data: [number, IShopCartInfos]
}
const props = defineProps<IProps>()
const shopId = props.data[0]
const cartList = props.data[1]
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
// 判断是否为全选
const isAllChecked = computed(() => cartStore.isAllSelect(Number(shopId)))
// 删除购物车中单个商品
const onDelete = (shopId: number, goodsId: string) => {
  cartStore.deleteCartGoods(shopId, goodsId)
}
</script>
<template>
  <div class="cartItemPage">
    <div class="shopTitle">
      <div class="iconCheck" @click="cartStore.toggleAllSelect(Number(shopId))">
        <van-icon
          name="checked"
          size="4.26vw"
          v-if="isAllChecked"
          color="var(--theme-color)"
        />
        <van-icon
          name="circle"
          color="var(--theme-color)"
          v-else
          size="4.26vw"
        />
      </div>

      <div class="shopTitle-name">
        <RouterLink :to="'shop/' + shopId">
          {{ cartList.shopName }}
        </RouterLink>
      </div>
      <van-icon name="arrow" size="4.26vw" color="#B4B9C1" />
    </div>
    <div class="goodsItem">
      <template v-for="item in cartList.goodsList" :key="item.index">
        <van-swipe-cell class="goodsWrap">
          <div class="cart">
            <CartGoodsItem
              :goodsData="item"
              :shopId="shopId"
              :iconWid="26"
              :marginBottom="0"
              :shopName="cartList.shopName"
              :titleMaxWid="160"
            ></CartGoodsItem>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              right-width="60"
              @click="onDelete(Number(shopId), item.goodsId)"
            />
          </template>
        </van-swipe-cell>
      </template>
    </div>
  </div>
</template>
<style>
.cartItemPage {
  .van-button {
    width: 60px;
    height: 100%;
    font-size: 12px;
    color: #ffffff;
    background: var(--theme-color);
  }
}
</style>
<style scoped lang="scss">
.cartItemPage {
  margin: 12px 16px 0;
  background-color: #fff;
  border-radius: 4px;
  border-radius: 4px;
  .shopTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 49px;
    padding: 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #f2f3f5;
    &-name {
      flex: 1;
      margin-left: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #051733;
    }
  }
  .cart {
    margin: 0 12px;
    padding: 10px 0;
    position: relative;
    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      content: '';
      width: 295px;
      height: 1px;
      background: #f2f3f5;
    }
  }
}
</style>
