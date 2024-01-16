<script setup lang="ts">
import type { ISearchShopItem } from '@/types/search'
const props = defineProps<{
  shopItemData: ISearchShopItem
}>()
const shopInfo = props.shopItemData
</script>
<template>
  <div class="shopItemPage">
    <RouterLink :to="`/shop/${shopInfo.shopId}`">
      <div class="shopItem common-wrap">
        <div class="shopImg">
          <img :src="shopInfo.avatarUrl" alt="店铺头像" />
        </div>
        <div class="shopContent">
          <div class="shopContent-title common-ellipsis">
            {{ shopInfo.shopName }}
          </div>
          <div class="shopContent-info">
            <div class="info-left">
              <div class="score">
                <van-icon
                  name="star"
                  class="icon-star"
                  color="#FF445B"
                  size="3.2vw"
                />
                <div class="score-text">{{ shopInfo.score }}</div>
              </div>
              <div class="saleInfo">
                <span class="saleInfo-title">月售</span>
                <span class="saleInfo-num">{{ shopInfo.monthlySales }}+</span>
              </div>
              <div class="saleInfo">
                <span class="saleInfo-title">起送</span>
                <span class="saleInfo-num">{{
                  shopInfo.deliveryStratingPrice
                }}</span>
              </div>
              <div class="saleInfo">
                <span class="saleInfo-title">配送</span>
                <span class="saleInfo-num">{{
                  shopInfo.deliveryStrategy
                }}</span>
              </div>
            </div>
            <div class="info-right">
              <div class="sendWay">
                <span>{{ shopInfo.deliveryTags }}</span>
              </div>
              <div class="sendInfo">
                <span
                  >{{ shopInfo.deliveryTime }}
                  {{ shopInfo.deliveryDistance }}</span
                >
                <!-- <span></span> -->
              </div>
            </div>
          </div>
          <div class="shopContent-rank">
            <span class="rank-text">{{ shopInfo.tops }}</span>
          </div>
          <div class="shopContent-label">
            <template
              v-for="item in shopInfo.discounts[0].content"
              :key="item.if"
            >
              <span>{{ item.if }}减{{ item.count }}</span>
            </template>
            <!-- <span>新客立减1</span> -->
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
<style scoped lang="scss">
.shopItem {
  display: flex;
  margin-top: 0;
  .shopImg {
    width: 97px;
    height: 97px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      flex-shrink: 0;
    }
  }
  .shopContent {
    flex: 1;
    margin-left: 8px;
    &-title {
      max-width: 200px;
      height: 26px;
      font-size: 14px;
      font-weight: 600;
      line-height: 26px;
    }
    &-info {
      display: flex;
      height: 30px;
      margin: 2px 0 4px 0;
      .info-left {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        .score {
          display: flex;
          height: 100%;
          align-items: center;
          transform: scale(0.85);
          box-sizing: border-box;
          .icon-star {
            margin-top: -2px;
          }
          .score-text {
            margin-left: 2px;
          }
        }
        .saleInfo {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 0 0 0 6px;
          transform: scale(0.85);
          color: #818b98;
        }
        .saleInfo::before {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-7px);
          content: '';
          display: block;
          width: 1px;
          height: 14px;
          background-color: #f2f3f5;
        }
      }
      .info-right {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        transform: scale(0.85);
        margin-right: -2px;
        span {
          color: #f68d14;
          line-height: 10px;
          display: inline-block;
          text-wrap: nowrap;
          transform: scale(0.85);
        }
        .sendWay {
          border-radius: 1px;
          border: 1px solid #f68d14;
          padding: 1px 0;
          margin-bottom: 3px;
        }
        .sendInfo {
          span {
            position: relative;
            right: -5px;
            display: inline-block;
            // text-align: right;
            // margin-left: 5px;
          }
        }
      }
    }
    &-rank {
      box-sizing: border-box;
      display: inline-block;
      height: 17px;
      border-radius: 2px;
      margin-bottom: 4px;
      background: rgba(6, 213, 6, 0.1);
      span {
        display: inline-block;
        transform: scale(0.85);
        line-height: 17px;
        color: #06d506;
      }
    }
    &-label {
      box-sizing: border-box;
      display: flex;
      height: 13px;
      line-height: 13px;
      span {
        display: inline-block;
        padding: 1px 2px;
        transform: scale(0.85);
        border-radius: 1px;
        border: 1px solid #ff445b;
        color: #ff445b;
        line-height: 10px;
        // margin-left: -5px;
        margin-right: 2px;
      }
    }
  }
}
</style>
