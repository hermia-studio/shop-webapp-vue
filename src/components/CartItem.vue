<script setup lang="ts">
import CartSettlement from './CartSettlement.vue'
import { ref, computed } from 'vue'
import CartGoodsItem from './CartGoodsItem.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
// 属性
const showBottom = ref(false)
// 根据店铺获取本地的购物车数据
const { shopId } = route.params
const cartInfo = computed(() => cartStore.getShopCartInfo(Number(shopId)))
// 已选择数量
const selectNum = computed(() => {
  return cartStore.selectGoodsNum(Number(shopId))
})

// 方法
// 点击展示购物车
const showBot = () => {
  showBottom.value = !showBottom.value
}
// 判断是否为全选
const isAllChecked = computed(() => cartStore.isAllSelect(Number(shopId)))
</script>
<template>
  <div class="cartItem">
    <!-- 弹出层 -->
    <div class="cartList">
      <!-- 底部弹出 -->
      <van-popup
        v-model:show="showBottom"
        position="bottom"
        :style="{ height: '366px' }"
      >
        <div class="popTitle">
          <div
            class="icon-check"
            @click="cartStore.toggleAllSelect(Number(shopId))"
          >
            <van-icon
              name="checked"
              size="4.26vw"
              v-if="isAllChecked"
              color="var(--theme-color)"
            />
            <van-icon
              name="circle"
              v-else
              size="4.26vw"
              color="var(--theme-color)"
            />
          </div>
          <div class="popTitle-name">购物车</div>
          <div class="selectNum">已选中{{ selectNum }}件</div>

          <div class="delete" @click="cartStore.clearCart(Number(shopId))">
            <van-icon name="delete" size="4.26vw" color="#9BA2AD" />
            <span>清空购物车</span>
          </div>
        </div>
        <div class="popList">
          <div
            class="popItem"
            v-for="item in cartInfo?.goodsList"
            :key="item.goodsId"
          >
            <CartGoodsItem
              :goodsData="item"
              :shopName="cartInfo?.shopName || ''"
              :shopId="Number(shopId)"
              :iconWid="32"
              :marginBottom="10"
            ></CartGoodsItem>
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 结算框 -->
    <div class="settlement">
      <CartSettlement @show="showBot" :shopId="Number(shopId)"></CartSettlement>
    </div>
  </div>
</template>
<style lang="scss">
.cartItem {
  .van-popup {
    border-radius: 12px 12px 0px 0px;
  }
}
</style>
<style lang="scss" scoped>
.cartItem {
  .cartList {
    .popTitle {
      box-sizing: border-box;
      position: fixed;
      z-index: 10;
      bottom: 326px;
      left: 0;
      width: 100%;
      height: 40px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      background-color: #f2f3f5;
      border-radius: 12px 12px 0px 0px;
      .popTitle-name {
        margin: 0 6px 0 12px;
        width: 42px;
        font-size: 14px;
        font-weight: 600;
        color: #051733;
      }
      .selectNum {
        flex: 1;
        color: #818b98;
      }
      .delete {
        display: flex;
        align-items: center;
        span {
          color: #9ba2ad;
          margin-left: 2px;
        }
      }
    }
    .popList {
      box-sizing: border-box;
      padding: 50px 16px 16px;
      height: 306px;
      overflow: auto;
      border: 1px solid transparent;
    }
  }
  .settlement {
    height: 60px;
  }
}
</style>
