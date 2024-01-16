<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { shopGoodsList } from '@/api/shop'
import type { IShopGoods, IGoodsItem } from '@/types/goods'
import GoodsItem from '@/components/GoodsItem.vue'
import BScroll from '@better-scroll/core'
import { computed } from 'vue'
import { watch } from 'vue'
// 获取菜单数据
const route = useRoute()
const { shopId } = route.params
let MenuList = ref([] as IGoodsItem[])
let shopName = ref('')
const getMenuList = async () => {
  let result: IShopGoods
  try {
    result = await shopGoodsList(Number(shopId))
    MenuList.value = result.data
    shopName.value = result.shopName
  } catch (error) {
    MenuList.value = [] as IGoodsItem[]
  }
}
getMenuList()
// 计算indexList
const indexList = computed(() => {
  return MenuList.value.map((v) => v.typename)
})
// 创建侦听器，等有数据了再在触发scroll
watch(
  indexList,
  (value) => {
    if (value.length > 0) {
      setTimeout(() => {
        new BScroll('.scroll-wrapper', {
          click: true
        })
      }, 100)
    }
  },
  {
    immediate: true
  }
)
</script>
<template>
  <div class="good-list">
    <van-index-bar :index-list="indexList" teleport="#menu">
      <template v-for="item in MenuList" :key="item.typeId">
        <van-index-anchor :index="item.typename">{{
          item.typename
        }}</van-index-anchor>
        <template v-for="goods in item.goods" :key="goods.goodsId">
          <GoodsItem
            :goodsData="goods"
            :shopId="Number(shopId)"
            :shopName="shopName"
          ></GoodsItem>
        </template>
      </template>
    </van-index-bar>
  </div>
</template>
<style scoped lang="scss"></style>
