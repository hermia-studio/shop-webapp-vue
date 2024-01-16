<script setup lang="ts">
import type { IOrderItem } from '@/types/order'
defineProps<{
  goodsDate: IOrderItem | null
  show: boolean
}>()
</script>
<template>
  <div class="orderListPage">
    <div class="list-tittle">
      <div class="shopName">{{ goodsDate?.shopName }}</div>
      <div
        class="order-status"
        v-if="show"
        :class="{
          success: !goodsDate?.isCanceled,
          cancel: goodsDate?.isCanceled
        }"
      >
        {{ goodsDate?.isCanceled ? '已取消' : '已完成' }}
      </div>
    </div>
    <div class="list-content">
      <div
        class="goodsItem"
        v-for="item in goodsDate?.goodsList"
        :key="item?.goodsId"
      >
        <img :src="item.imgUrl" alt="" />
        <div class="goods-detail">
          <div class="goodsName common-ellipsis">{{ item.name }}</div>
          <div class="goodsNum">x{{ item.cartCount }}</div>
        </div>
        <div class="price">
          <div class="newPrice">
            <span class="unit">￥</span>
            <span class="priceText">{{ item.price }}</span>
          </div>
          <div class="oldPrice">￥{{ item.oldPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.orderListPage {
  width: 343px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4px;
  margin-top: 12px;
  padding: 12px 0;

  .list-tittle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px 10px;
    border-bottom: 1px solid #f2f3f5;
    .shopName {
      height: 26px;
      font-size: 14px;
      font-weight: 600;
      color: #051733;
      line-height: 26px;
    }
    .order-status {
      height: 22px;
      font-size: 13px;
      line-height: 22px;
    }
    .success {
      color: #06d506;
    }
    .cancel {
      color: #697485;
    }
  }
  .list-content {
    padding: 0px 12px;
    .goodsItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      .goods-detail {
        flex: 1;
        .goodsName {
          max-width: 200px;
          height: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #051733;
          line-height: 20px;
        }
        .goodsNum {
          height: 22px;
          font-size: 12px;
          color: #818b98;
          line-height: 22px;
        }
      }
      .price {
        .newPrice {
          color: var(--theme-color);
          height: 23px;

          .unit {
            display: inline-block;
            transform: scale(0.85);
          }
          .priceText {
            font-size: 16px;
            font-weight: 600;
            line-height: 23px;
          }
        }
        .oldPrice {
          text-align: right;
          height: 15px;
          color: #b4b9c1;
          line-height: 15px;
          transform: scale(0.85);
          margin-right: -2px;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
