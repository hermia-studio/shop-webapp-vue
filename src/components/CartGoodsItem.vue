<script setup lang="ts">
import ToCart from './ToCart.vue'
import type { IGood } from '@/types/goods'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
//props默认值
export interface Props {
  goodsData: IGood
  shopId: number
  iconWid: number
  marginBottom?: number
  shopName: string
  titleMaxWid?: number
}

// 接收数据
const props = withDefaults(defineProps<Props>(), {
  marginBottom: 0,
  titleMaxWid: 180
})
const marginBot = computed(() => {
  return props.marginBottom / 3.75 + 'vw'
})
const iconMarginR = computed(() => {
  return (props.iconWid - 16) / 3.75 + 'vw'
})
const TitleMaxWid = computed(() => {
  return props.titleMaxWid / 3.75 + 'vw'
})

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
// 动态切换单选状态
const cartStore = useCartStore()
const toggle = (shopId: number, goodsId: string) => {
  cartStore.toggleSelect(shopId, goodsId)
}
</script>
<template>
  <div class="goodsPage">
    <div
      class="goodsPage-left"
      @click="toggle(props.shopId, props.goodsData.goodsId)"
    >
      <van-icon
        name="checked"
        size="4.26vw"
        v-if="goodsData.checked"
        color="var(--theme-color)"
      />
      <van-icon name="circle" color="var(--theme-color)" v-else size="4.26vw" />
    </div>
    <div
      class="goodsPage-mid"
      @click="goToDetails(props.shopId, props.goodsData.goodsId)"
    >
      <img :src="props.goodsData.imgUrl" alt="商品图片" />
    </div>
    <div
      class="goodsPage-right"
      @click="goToDetails(props.shopId, props.goodsData.goodsId)"
    >
      <div class="goods-name common-ellipsis">{{ props.goodsData.name }}</div>
      <div class="goods-spec common-ellipsis">
        <template v-for="item in props.goodsData.tips" :key="item.index">
          <span class="spec-item">{{ item }}</span>
        </template>
      </div>
      <div class="goods-price">
        <div class="priceItem">
          <span class="unit">￥</span>
          <span class="new-price">{{ props.goodsData.price }}</span>
          <span class="old-price">￥{{ props.goodsData.oldPrice }}</span>
        </div>
        <div class="toCart">
          <!-- 数量组件 -->
          <ToCart
            :goods="props.goodsData"
            :shopId="props.shopId"
            :shopName="shopName"
          ></ToCart>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.goodsPage {
  display: flex;
  margin-bottom: v-bind(marginBot);
  align-items: center;
  height: 110px;
  &-left {
    height: 100%;
    line-height: 110px;
    margin-right: v-bind(iconMarginR);
  }
  &-mid {
    width: 110px;
    height: 110px;
    flex-shrink: 0;
    margin-right: 12px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .goods-name {
      max-width: v-bind(TitleMaxWid);
      height: 20px;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      margin-bottom: 6px;
    }
    .goods-spec {
      max-width: 150px;
      margin-bottom: 13px;
      height: 17px;
      line-height: 17px;
      color: #4f5c70;

      .spec-item::after {
        content: '|';
        display: inline-block;
        width: 1px;
        height: 17px;
        margin: 0 5px;
      }
      .spec-item:last-child::after {
        display: none;
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
