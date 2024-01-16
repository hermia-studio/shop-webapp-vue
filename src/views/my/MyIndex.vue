<script setup lang="ts">
import MyTop from './MyTop.vue'
</script>
<template>
  <div class="myPage">
    <div class="topbar">
      <van-nav-bar title="我的">
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <MyTop></MyTop>
    </div>
  </div>
</template>
<style scoped lang="scss">
.myPage {
  background-color: #f7f8fa;
  min-height: 100vh;
  .content {
    padding: 16px 16px 0 16px;
  }
}
</style>
