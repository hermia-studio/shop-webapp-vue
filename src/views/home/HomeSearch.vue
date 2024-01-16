<script setup lang="ts">
import { ref } from 'vue'
import SearchPage from './SearchPage.vue'
// 搜索页显隐
const showPop = ref(false)
</script>
<template>
  <div class="searchView">
    <!-- 搜索框 -->
    <van-sticky :offset-top="0">
      <div class="searchInput" @click="showPop = true">
        <span class="iconfont icon-sousuo"></span>
        <input type="text" placeholder="请输入关键词" />
        <div class="searchText">搜索</div>
      </div>
    </van-sticky>
    <!-- 弹出层 -->
    <van-popup
      v-model:show="showPop"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <!-- 搜索页 -->
      <SearchPage @close="showPop = false"></SearchPage>
    </van-popup>
  </div>
</template>
<style lang="scss">
.searchView {
  .van-sticky--fixed {
    padding: 5px 0;
    background: linear-gradient(to right, var(--theme-color), #fb7887);
    z-index: 90;
  }
}
</style>
<style scoped lang="scss">
.searchView {
  .searchInput {
    display: flex;
    align-items: center;
    height: 36px;
    margin: 0px 16px;
    position: relative;
    border-radius: 22px;
    background-color: #f5f6f7;
    .icon-sousuo {
      font-size: 20px;
      margin: 0 4px 0 20px;
      color: var(--theme-color);
      margin-top: -2px;
    }
    input {
      box-sizing: border-box;
      flex: 1;
      height: 100%;
      border: none;
      background-color: #f5f6f7;
    }
    input::placeholder {
      color: #aaaab4;
      font-size: 14px;
    }
    .searchText {
      width: 28px;
      height: 100%;
      line-height: 36px;
      font-size: 14px;
      color: #4f5c70;
      padding: 0 20px;
    }
  }
}
</style>
