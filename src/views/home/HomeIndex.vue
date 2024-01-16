<script setup lang="ts">
import LocationView from './LocationView.vue'
import HomeSearch from './HomeSearch.vue'
import BannerView from './BannerView.vue'
import HomeMenu from './HomeMenu.vue'
import PriceKillView from './PriceKillView.vue'
import HomeRecommend from './HomeRecommend.vue'
</script>
<template>
  <div class="homePage">
    <div class="topbar">
      <van-nav-bar title="商城首页">
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 定位 -->
    <LocationView></LocationView>
    <!-- 搜索框 -->
    <HomeSearch></HomeSearch>
    <!-- banner图 -->
    <BannerView></BannerView>
    <!-- 菜单列表 -->
    <HomeMenu></HomeMenu>
    <!-- 特价秒杀 -->
    <PriceKillView></PriceKillView>
    <!-- 分类推荐 -->
    <HomeRecommend></HomeRecommend>
  </div>
</template>
<style lang="scss">
.homePage {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, var(--theme-color) 0%, #f7f8fa 288px);
  padding-bottom: 70px;
}
</style>
