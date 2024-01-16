<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { AutoWidth } from '@/use/AutoWidth'
import { shopDetailList } from '@/api/shop'
import type { ISearchShopItem } from '@/types/search'
const text = ref('【公告】千丰水果，活国亚运，杭州亚运会官方指定新鲜水果批发商')
const width = AutoWidth(116)
const defaultInfo = {
  shopId: 0,
  category: 0,
  avatarUrl: '',
  shopBg: '',
  shopName: '',
  keyword: [''],
  score: 0,
  monthlySales: 0,
  deliveryTime: '',
  deliveryDistance: '',
  deliveryStratingPrice: '',
  deliveryStrategy: '',
  deliveryTags: '',
  comments: [''],
  tops: '',
  services: [
    {
      type: 1,
      value: ''
    }
  ],
  redbags: [
    {
      type: 1,
      label: ''
    }
  ],
  discounts: [
    {
      type: 1,
      label: '',
      content: [
        {
          if: 0,
          count: 0
        }
      ]
    }
  ],
  announcement: ''
}
// 拿到路由参数
const route = useRoute()
const { shopId } = route.params
const data = ref(defaultInfo as ISearchShopItem)
const getShopDetails = async () => {
  try {
    data.value = await shopDetailList(Number(shopId))
  } catch (error) {
    data.value = defaultInfo as ISearchShopItem
  }
}
getShopDetails()
// 服务标签的展开
import { useToggle } from '@vueuse/core'
import { computed } from 'vue'
const [active, toggle] = useToggle(false) //默认隐藏
// 根据不同的标签数 显示不同状态
const services = computed(() => {
  if (active.value) {
    console.log(width.value)
    return data.value.services
  } else {
    return data.value.services.slice(0, 3)
  }
})
</script>
<template>
  <div class="shopview">
    <div class="topBg">
      <img :src="data.shopBg" alt="" />
    </div>
    <div class="shopTopPage">
      <div class="shopTop">
        <div class="shopTop-left">
          <p class="common-ellipsis">{{ data.shopName }}</p>
          <div class="left-server">
            <div class="rank">
              <div class="core">
                <van-icon name="star" size="3.2vw" color="var(--theme-color)" />
                <span class="coreText">{{ data.score }}</span>
              </div>
              <div class="way">{{ data.deliveryTags }}</div>
              <span class="time">配送约{{ data.deliveryTime }}分钟</span>
              <span class="num">月售{{ data.monthlySales }}+</span>
            </div>
            <div class="service">
              <template v-for="item in services" :key="item.type">
                <div class="item">
                  <van-icon name="checked" color="#06D506" size="3.2vw" />
                  <span>{{ item.value }}</span>
                </div>
              </template>
              <div class="icom-arrow item" @click="toggle()">
                <van-icon
                  v-if="active"
                  name="arrow-up"
                  color="#818B98"
                  size="3.2vw"
                />
                <van-icon
                  name="arrow-down"
                  color="#818B98"
                  size="3.2vw"
                  v-else
                />
              </div>
            </div>
          </div>
        </div>
        <div class="shopTop-right">
          <img :src="data.avatarUrl" alt="" />
        </div>
      </div>
      <div class="shopTop-notice">
        <van-icon
          name="bullhorn-o"
          color="#F68D14"
          size="3.2vw"
          class="icon-laba"
        />
        <div class="info">
          <van-text-ellipsis
            :content="text"
            expand-text="展开"
            collapse-text="收起"
          >
          </van-text-ellipsis>
        </div>
        <!-- <van-icon name="arrow-down" color="#818B98" size="3.2vw" /> -->
      </div>
      <div class="rebag">
        <van-swipe :loop="false" :width="width" :show-indicators="false">
          <template v-for="item in data.discounts[0].content" :key="item.if">
            <van-swipe-item>
              <div class="redbagItem">
                <div class="count">
                  <span class="unit">￥</span>
                  <span class="num">{{ item.count }}</span>
                </div>
                <div class="discount">满{{ item.if }}可用</div>
                <div class="divide"></div>
                <div class="get">领</div>
              </div>
            </van-swipe-item>
          </template>
        </van-swipe>
      </div>
    </div>
  </div>
</template>
<style>
.van-text-ellipsis__action {
  display: inline-block;
  margin-left: 8px;
  transform: scale(0.85);
  line-height: 10px;
}
</style>
<style scoped lang="scss">
.topBg {
  width: 100%;
  height: 70px;
  padding: 0;
  img {
    position: absolute;
    top: 44px;
    width: 100%;
    height: 90px;
    z-index: -1;
  }
}
.shopTopPage {
  // position: relative;
  // top: -20px;
  border-radius: 12px 12px 0px 0px;
  background-color: #fff;
  padding: 16px 16px 10px;
  .van-swipe-item {
    box-sizing: border-box;
    padding-right: 4px;
  }
  .shopTop {
    display: flex;
    justify-content: space-between;
    &-left {
      flex: 1;
      p {
        width: 234px;
        height: 26px;
        font-size: 18px;
        font-family: MicrosoftYaHeiSemibold;
        line-height: 26px;
      }
      .left-server {
        margin-right: 5px;
        .rank {
          display: flex;
          align-items: center;
          height: 17px;
          transform: scale(0.85);
          //   margin-left: -20px;
          margin: 5px 0 5px -20px;
          .coreText {
            color: var(--theme-color);
            margin-left: 3px;
          }
          .way {
            height: 13px;
            border-radius: 1px;
            border: 1px solid #f68d14;
            color: #f68d14;
            margin: 0 10px;
            padding: 1px;
          }
          .time,
          .num {
            color: #818b98;
            margin-right: 10px;
          }
        }
        .service {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          padding: 1px 0;
          transform: scale(0.85);
          margin-left: -20px;
          // padding-bottom: 10px;
          .item {
            height: 17px;
            line-height: 17px;
            margin-right: 5px;
            span {
              color: #818b98;
              margin-left: 2px;
            }
          }
          .icom-arrow {
            padding: 0 2px;
          }
        }
      }
    }
    &-right {
      width: 70px;
      height: 70px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .shopTop-notice {
    display: flex;
    margin: 10px 0;
    .info {
      flex: 1;
      width: 310px;
      color: #818b98;
      line-height: 14px;
    }
    .icon-laba {
      position: relative;
      top: 3px;
    }
  }
  .rebag {
    height: 24px;
    .redbagItem {
      display: flex;
      align-items: center;
      color: #fff;
      height: 24px;
      padding: 0 4px;
      background: linear-gradient(270deg, #ff7159 0%, #ff445b 100%);
      .count {
        .unit {
          transform: scale(0.85);
        }
        .num {
          font-size: 14px;
        }
      }
      .discount {
        transform: scale(0.85);
        flex: 1;
      }
      .divide {
        width: 0px;
        height: 14px;
        border: 1px dashed #fff;
        margin: 0 4px 0 3px;
      }
      .get {
        transform: scale(0.85);
      }
    }
  }
}
</style>
