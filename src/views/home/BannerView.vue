<script setup lang="ts">
import { ref } from 'vue'
import { getBannerList } from '@/api/home'
import type { IBannerList } from '@/types/home'
let bannerList = ref([] as IBannerList)
const getBanner = async () => {
  bannerList.value = await getBannerList()
}
getBanner()
</script>
<template>
  <div class="home-banner">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <a :href="item.advUrl">
          <img :src="item.imageUrl" />
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style lang="scss" scoped>
.home-banner {
  width: 343px;
  height: 160px;
  margin: 8px auto 12px auto;
  border-radius: 5px;
  --van-swipe-indicator-active-background: var(--theme-color);
  --van-swipe-indicator-inactive-background: #dadce1;
  img {
    width: 343px;
    height: 160px;
    object-fit: fill;
    border-radius: 5px;
  }
}
</style>
