<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import ToCart from '@/components/ToCart.vue'
import { ref, computed } from 'vue'
import GoodsDetail from './GoodsDetail.vue'
import DemoTab from './DemoTab.vue'
import type { IGoodsDetail, IGood } from '@/types/goods'
import { getGoodsDetails } from '@/api/good'
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/CartItem.vue'
const carStore = useCartStore()
const router = useRouter()
const route = useRoute()
const { shopId, goodsId } = route.params
// 返回按钮
const goback = () => {
  router.back()
}
const goodsDetails = ref({
  shopId: 0,
  shopName: 'xx',
  goods: {
    goodsId: '',
    name: '',
    imgUrl: '',
    sellCount: 0,
    rating: '',
    price: 0,
    oldPrice: 0,
    tips: [''],
    discount: {
      type: 0,
      value: 0,
      limitCount: 0
    },
    cartCount: 0,
    checked: false
  }
} as IGoodsDetail)
const active = ref(0)
const tabs = [
  {
    id: 1,
    title: '商品',
    component: GoodsDetail
  },
  {
    id: 2,
    title: '详情',
    component: DemoTab
  },
  {
    id: 3,
    title: '评价',
    component: DemoTab
  }
]
// 获取商品详情数据
const getGoodsDetailList = async () => {
  try {
    goodsDetails.value = await getGoodsDetails(
      Number(shopId),
      goodsId as string
    )
  } catch (error) {
    goodsDetails.value = {} as IGoodsDetail
  }
}
getGoodsDetailList()

//拿到当前加入购物车的数量 有数量时显示数量组件
const cartCount = computed(() =>
  carStore.getGoodsCartInfo(Number(shopId), goodsId as string)
)
// 点击加入购物车
const onAdd = (shopId: number, shopName: string, goods: IGood) => {
  carStore.pushProductToCart(shopId, shopName, goods)
}
</script>
<template>
  <div class="goodsPage">
    <div class="topBar">
      <van-nav-bar title="商品详情" left-arrow @click-left="goback">
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <div class="pageTop">
      <img :src="goodsDetails.goods.imgUrl" alt="" />
      <div class="introduce">
        <div class="introduce-title">{{ goodsDetails.shopName }}</div>
        <div class="introduce-info">
          <div class="spec">
            <span v-for="(item, index) in goodsDetails.goods.tips" :key="index">
              {{ item }}</span
            >
          </div>
          <div class="discount">
            <span
              >{{ goodsDetails.goods.discount.value }}折 限{{
                goodsDetails.goods.discount.limitCount
              }}份</span
            >
          </div>
          <van-icon name="star" color="#FFAF0F" size="3.74vw" />
          <div class="rank">评分 {{ goodsDetails.goods.rating }}</div>
        </div>
        <div class="introduce-sale">
          月售：{{ goodsDetails.goods.sellCount }}
        </div>
        <div class="introduce-price">
          <div class="price">
            <div class="newPrice">
              <span class="unit">￥</span>{{ goodsDetails.goods.price }}
            </div>
            <div class="oldPrice">￥{{ goodsDetails.goods.oldPrice }}</div>
          </div>
          <div
            class="toCart"
            v-if="cartCount === 0"
            @click="
              onAdd(Number(shopId), goodsDetails.shopName, goodsDetails.goods)
            "
          >
            <van-icon
              name="plus"
              class="icon-plus"
              size="4.27vw"
              color="#fff"
            />
            <span>加入购物车</span>
          </div>
          <ToCart
            :shopId="Number(shopId)"
            :goods="goodsDetails.goods"
            :shopName="goodsDetails.shopName"
            v-else
          ></ToCart>
        </div>
      </div>
    </div>
    <div class="goodsDetail">
      <van-tabs v-model:active="active" :swipeable="true">
        <template v-for="item in tabs" :key="item.id">
          <van-tab :title="item.title">
            <component :is="item.component"></component>
          </van-tab>
        </template>
      </van-tabs>
    </div>
    <CartItem></CartItem>
  </div>
</template>
<style>
.goodsPage {
  --van-nav-bar-background: #f7f8fa;
  .van-hairline--bottom:after {
    border: 0;
  }
  .van-tabs__wrap {
    height: 42px;
    margin-left: 16px;
  }
  .van-tab {
    flex: none;
    margin-right: 30px;
  }
  .van-tabs__nav {
    background-color: #f7f8fa;
  }
  .van-tabs__nav--line {
    padding-bottom: 0px;
  }
  .van-tab {
    /* width: 60px; */
    width: 28px;
    /* padding: 0 15px; */
    font-size: 14px;
    color: #818b98;
    box-sizing: content-box;
  }
  .van-tab--active {
    color: var(--theme-color);
  }
  .van-tabs__line {
    width: 30px;
    height: 2px;
    background: var(--theme-color);
    border-radius: 2px;
    bottom: 6px;
  }
}
</style>
<style scoped lang="scss">
.goodsPage {
  height: 100vh;
  margin-bottom: 50px;
  overflow: scroll;
  background-color: #f7f8fa;
  .pageTop {
    img {
      width: 375px;
      height: 280px;
      background-color: khaki;
    }
    .introduce {
      padding: 16px;
      background-color: #fff;
      &-title {
        height: 28px;
        font-size: 20px;
        color: #051733;
      }
      &-info {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        .spec {
          display: flex;
          font-size: 14px;
          color: #4f5c70;
          span::after {
            content: '|';
            display: inline-block;
            width: 1px;
            height: 17px;
            margin: 0 5px;
          }
          span:last-child::after {
            display: none;
          }
        }
        .discount {
          height: 13px;
          border-radius: 1px;
          border: 1px solid #f68d14;
          transform: scale(0.85);
          margin: 0 5px;
          span {
            display: inline-block;
            transform: scale(0.85);
            color: #f68d14;
            line-height: 7px;
          }
        }
        .rank {
          color: #4f5c70;
          margin-left: 4px;
        }
      }
      &-sale {
        height: 17px;
        font-size: 12px;
        color: #9ba2ad;
        line-height: 17px;
        margin-bottom: 11px;
      }
      &-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          display: flex;
          align-items: flex-end;
          height: 100%;
          .newPrice {
            color: var(--theme-color);
            font-size: 18px;
            font-size: 20px;
            font-weight: 600;
            .unit {
              font-size: 16px;
              font-weight: 400;
            }
          }
          .oldPrice {
            text-decoration: line-through;
            font-size: 14px;
            color: #b4b9c1;
            margin-left: 9px;
          }
        }
        .toCart {
          box-sizing: border-box;
          padding: 2px 12px;
          width: 118px;
          height: 32px;
          background: #ff445b;
          border-radius: 16px;
          color: #fff;
          display: flex;
          align-items: center;
          .icon-plus {
            margin-right: 8px;
            margin-top: -2px;
          }
        }
      }
    }
  }
}
</style>
