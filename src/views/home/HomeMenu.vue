<script setup lang="ts">
import { ref } from 'vue'
import { getMenuList } from '@/api/home'
import type { IMenuList } from '@/types/home'
let menuList = ref([] as IMenuList)
const getMenuListData = async () => {
  menuList.value = await getMenuList()
}
getMenuListData()
</script>
<template>
  <div class="home-menu">
    <div class="menuItem" v-for="item in menuList" :key="item.id">
      <a :href="item.href">
        <img :src="item.imgUrl" alt="菜单图标" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>
<style scoped lang="scss">
.home-menu {
  width: 323px;
  height: 160px;
  padding: 10px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 6px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 11px;
  .menuItem {
    a {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 32px;
        height: 32px;
      }
      p {
        height: 20px;
        font-size: 12px;
        color: #051733;
        line-height: 20px;
      }
    }
  }
}
</style>
