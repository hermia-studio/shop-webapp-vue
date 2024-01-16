<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  img: string
  imgWid: number
}>()
defineEmits<{
  (e: 'toShop'): void
}>()
const ImgWid = computed(() => {
  return props.imgWid / 3.75 + 'vw'
})
</script>
<template>
  <div class="contain">
    <div class="card">
      <img :src="props.img" alt="" />
      <slot name="text"></slot>
    </div>
    <div class="shopBtn" @click="$emit('toShop')">去购物</div>
    <slot name="history"> </slot>
  </div>
</template>
<style scoped lang="scss">
.contain {
  width: 375px;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f8fa;
  .card {
    width: 295px;
    height: 376px;
    background: #ffffff;
    border-radius: 8px;
    margin: 40px;
    display: flex;
    flex-direction: column;
    img {
      width: v-bind(ImgWid);
      height: 182px;
      margin: 50px auto 20px;
    }
  }
  .shopBtn {
    width: 279px;
    height: 50px;
    background: var(--theme-color);
    border-radius: 25px;
    margin: 0 48px;
    text-align: center;
    color: #ffffff;
    line-height: 50px;
    font-size: 16px;
  }
}
</style>
