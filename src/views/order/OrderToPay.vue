<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  show?: boolean
  totalNewPrice: number
  totalDiscount: number
  fixBottom?: number
}
// 接收数据
const props = withDefaults(defineProps<IProps>(), {
  show: true,
  fixBottom: 0
})
const FixBottom = computed(() => {
  return props.fixBottom + 'px'
})
defineEmits<{
  (e: 'submit'): void
}>()
</script>
<template>
  <div class="orderToPayPage">
    <div class="left">合计</div>
    <div class="mid">
      <div class="price">
        <span class="unit">￥</span>
        <span class="text">{{ totalNewPrice.toFixed(2) }}</span>
      </div>
      <div class="discount">已优惠￥{{ totalDiscount.toFixed(2) }}</div>
    </div>
    <div class="pay normal" v-if="show" @click="$emit('submit')">
      <slot></slot>
    </div>
    <div class="pay disable" v-else>
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.orderToPayPage {
  position: fixed;
  bottom: v-bind(FixBottom);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 375px;
  height: 62px;
  box-sizing: border-box;
  background: #ffffff;
  padding: 10px 16px 12px 20px;
  box-shadow: 0px -2 6px 0px rgba(45, 45, 75, 0.06);
  .left {
    width: 24px;
    height: 100%;
    font-size: 12px;
    color: var(--theme-color);
    line-height: 26px;
    margin-right: 2px;
  }
  .mid {
    flex: 1;
    .price {
      color: var(--theme-color);
      margin-bottom: 2px;
      height: 25px;
      font-weight: 600;

      .text {
        font-size: 18px;
        line-height: 25px;
      }
    }
    .discount {
      height: 14px;
      color: #818b98;
      line-height: 14px;
      transform: scale(0.85);
      margin-left: -18px;
    }
  }
  .pay {
    width: 110px;
    height: 38px;
    border-radius: 23px;
    color: #ffffff;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
  }
  .normal {
    background: var(--theme-color);
  }
  .disable {
    background-color: #f7f8fa;
    color: #818b98;
  }
}
</style>
