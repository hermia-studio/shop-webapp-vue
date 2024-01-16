<script setup lang="ts">
import ToCart from './ToCart.vue'
import type { IGood } from '@/types/goods'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
//props默认值
export interface Props {
  goodsData: IGood
  shopId: number
  shopName: string
  marginBottom?: number
}

// 接收数据
const props = withDefaults(defineProps<Props>(), {
  marginBottom: 20
})
const marginBot = computed(() => {
  return props.marginBottom + 'px'
})
const goods = props.goodsData
const router = useRouter()
const goToDetails = (shopId: number, goodsId: string) => {
  router.push({
    name: 'goods',
    params: {
      shopId,
      goodsId
    }
  })
}
</script>
<template>
  <div class="goodsPage" @click="goToDetails(shopId, goods.goodsId)">
    <div class="goodsPage-left">
      <img :src="props.goodsData.imgUrl" alt="商品图片" />
    </div>
    <div class="goodsPage-right">
      <div class="goods-name common-ellipsis">{{ goods.name }}</div>
      <div class="goods-spec common-ellipsis">
        <template v-for="item in goods.tips" :key="item.index">
          <span class="spec-item">{{ item }}</span>
        </template>
      </div>
      <div class="goods-number">
        月销：<span>{{ goods.sellCount }}</span>
      </div>
      <div class="goods-discount">
        <span
          >{{ (1 - goods.discount.value) * 10 }}折 限{{
            goods.discount.limitCount
          }}份</span
        >
      </div>
      <div class="goods-price">
        <div class="priceItem">
          <span class="unit">￥</span>
          <span class="new-price">{{ goods.price }}</span>
          <span class="old-price">￥{{ goods.oldPrice }}</span>
        </div>
        <div class="toCart">
          <!-- 数量组件 -->
          <ToCart :goods="goods" :shopId="shopId" :shopName="shopName"></ToCart>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.goodsPage {
  display: flex;
  // width: 263px;
  margin-bottom: v-bind(marginBot);
  &-left {
    width: 110px;
    height: 110px;
    flex-shrink: 0;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .goods-name {
      max-width: 140px;
      height: 20px;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      margin-bottom: 6px;
    }
    .goods-spec {
      max-width: 140px;
      margin-bottom: 5px;
      height: 17px;
      line-height: 17px;
      span {
        margin-right: 12px;
      }
    }
    .goods-number {
      margin-bottom: 3px;
      height: 17px;
      color: #818b98;
      line-height: 17px;
    }
    .goods-discount {
      margin-bottom: 4px;
      height: 13px;
      span {
        display: inline-block;
        transform: scale(0.85);
        border-radius: 1px;
        border: 1px solid #f68d14;
        color: #f68d14;
        line-height: 10px;
        padding: 2px;
        margin-left: -5px;
      }
    }
    .goods-price {
      display: flex;
      align-items: center;
      height: 23px;
      line-height: 23px;
      color: var(--theme-color);
      .priceItem {
        flex-shrink: 0;
        span.unit {
          display: inline-block;
          transform: scale(0.85);
        }
        span.new-price {
          height: 23px;
          font-size: 16px;
          font-weight: 600;
          line-height: 23px;
          margin-right: 3px;
        }
        span.old-price {
          color: #b4b9c1;
          height: 17px;
          line-height: 17px;
          text-decoration: line-through;
        }
      }
      .toCart {
        flex: 1;
      }
    }
  }
}
</style>
