<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import type { IAddressItem } from '@/types/Address'
const router = useRouter()
const route = useRoute()
const { shopId } = route.params
// 选择地址
const toSelectAddress = (shopId: number) => {
  router.push(shopId ? '/address?shopId=' + shopId : '/address')
}
const props = defineProps<{
  default: IAddressItem | null
}>()
</script>

<template>
  <div class="orderAdressPage">
    <div class="topText">收货信息</div>
    <div
      class="deliver"
      v-if="props.default"
      @click="toSelectAddress(Number(shopId))"
    >
      <div class="addreddDetails">
        <div class="addreddDetails-text">
          {{
            props.default.area.split('/').join('') +
            props.default.detailsAddress
          }}
        </div>
        <van-icon name="arrow" size="4.26vw" color="#B4B9C1" />
      </div>
      <div class="userInfo">
        <span class="userName">{{ props.default.receiver }}</span>
        <span class="phone">{{ props.default.phone }}</span>
      </div>
    </div>
    <div class="deliver-plus" v-else @click="toSelectAddress(Number(shopId))">
      <van-icon name="plus" size="4.26vw" color="#000" />
      <div class="select">选择收货地址</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.orderAdressPage {
  .topText {
    height: 17px;
    font-size: 12px;
    color: #ffffff;
    line-height: 17px;
    margin-bottom: 7px;
  }
  .deliver {
    // height: 80px;
    background: #ffffff;
    border-radius: 6px;
    padding: 12px;
    .addreddDetails {
      display: flex;
      align-items: center;
      // height: 26px;
      justify-content: space-between;
      &-text {
        font-size: 16px;
        font-weight: 600;
        color: #051733;
        line-height: 26px;
        margin-right: 10px;
      }
    }
    .userInfo {
      margin-top: 10px;
      height: 20px;
      font-size: 14px;
      color: #4f5c70;
      line-height: 20px;
      .userName {
        margin-right: 12px;
      }
    }
  }
  .deliver-plus {
    display: flex;
    align-items: center;
    height: 30px;
    background: #ffffff;
    border-radius: 6px;
    padding: 12px;
    .select {
      font-size: 16px;
      font-weight: 600;
      margin-left: 8px;
    }
  }
}
</style>
