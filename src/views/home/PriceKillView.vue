<script setup lang="ts">
import { ref } from 'vue'
import { AutoWidth } from '@/use/AutoWidth'
import type { ISeckillTimerList } from '@/types/home'
import { getSeckillTimer } from '@/api/home'
const time = ref(30 * 24 * 60 * 60 * 1000)
// 补0
const padStart = (value: number) => {
  return value.toString().padStart(2, '0')
}
const _width = AutoWidth(91)
// 获取数据
let seckillList = ref({} as ISeckillTimerList)
const getSeckillList = async () => {
  try {
    seckillList.value = await getSeckillTimer()
    time.value = seckillList.value.time
  } catch (error) {
    seckillList.value = {} as ISeckillTimerList
  }
}
getSeckillList()
// 倒计时结束时 下架该板块
let isTimeShow = ref(true)
const onFinish = () => {
  isTimeShow.value = false
}
</script>
<template>
  <div class="priceKill common-wrap" v-if="isTimeShow">
    <div class="priceKill-title">
      <p>特价秒杀</p>
      <div class="timeDown">
        <van-count-down :time="time" @finish="onFinish">
          <template #default="timeData">
            <!-- 修改时长 加上天 -->
            <span class="block">{{
              padStart(timeData.days * 24 + timeData.hours)
            }}</span>
            <span class="colon">:</span>
            <span class="block">{{ padStart(timeData.minutes) }}</span>
            <span class="colon">:</span>
            <span class="block">{{ padStart(timeData.seconds) }}</span>
          </template>
        </van-count-down>
      </div>
    </div>
    <div class="priceKill-content">
      <van-swipe :loop="false" :width="_width" :show-indicators="false">
        <template v-for="item in seckillList.goods" :key="item.shopId">
          <van-swipe-item>
            <RouterLink :to="`/goods-details/${item.shopId}/${item.goodId}`">
              <div class="swiperItem">
                <img :src="item.imgUrl" alt="商品图" />
                <div class="name common-ellipsis">{{ item.name }}</div>
                <div class="text">
                  <span class="unit">￥</span>
                  <span class="price">{{ item.price }}</span>
                </div>
              </div>
            </RouterLink>
          </van-swipe-item>
        </template>
      </van-swipe>
    </div>
  </div>
</template>
<style lang="scss">
.van-count-down {
  font-size: 12px;
  line-height: 22px;
}
</style>
<style scoped lang="scss">
.priceKill {
  padding: 12px;
  margin-bottom: 10px;
  &-title {
    display: flex;
    height: 22px;
    line-height: 22px;
    margin-bottom: 12px;
    p {
      font-size: 14px;
      font-weight: 600;
    }
    .timeDown {
      text-align: center;
      margin-left: 10px;
      font-size: 12px;
      .block {
        display: inline-block;
        width: 22px;
        height: 22px;
        background: var(--theme-color);
        border-radius: 2px;
        color: #fff;
      }
      .colon {
        display: inline-block;
        width: 4px;
        color: var(--theme-color);
        margin: 0 3px;
      }
    }
  }
  &-content {
    .swiperItem {
      display: block;
      // width: 100%;
      // height: 100%;
      background-color: #ffff;
      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
      }
      .name {
        width: 80px;
        height: 17px;
        line-height: 17px;
        font-size: 12px;
        margin: 4px 0 3px 0;
      }
      .text {
        width: 80px;
        height: 20px;
        line-height: 20px;
        color: var(--theme-color);
        span.unit {
          display: inline-block;
          transform: scale(0.85);
        }
        span.price {
          font-size: 14px;
          width: 30px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
