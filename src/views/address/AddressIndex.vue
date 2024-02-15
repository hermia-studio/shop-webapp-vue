<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { getAddress, delAddress } from '@/api/address'
import { ref } from 'vue'
import { showDialog, showConfirmDialog } from 'vant'
import type { IAddressItem } from '@/types/Address'
import { useInfoStore } from '@/stores/userInfo'
const userStore = useInfoStore()
const router = useRouter()
const route = useRoute()
const { shopId } = route.query
const goback = () => {
  router.back()
}
// 添加收货地址
const toAddAddress = () => {
  router.push('/address/edit')
}
let addressList = ref([] as IAddressItem[])
// 获取收货地址
const getAddressList = async () => {
  try {
    addressList.value = (await getAddress(
      userStore.userInfo.userId
    )) as IAddressItem[]
  } catch (error) {
    addressList.value = []
  }
}
getAddressList()
// 跳转到修改收货地址
const onUpdate = (addressId: number) => {
  router.push('/address/edit?addressId=' + addressId)
}
// 删除地址
const deleteAddress = async (userId: number, addressId: number) => {
  showConfirmDialog({
    title: '提示',
    message: '确认要删除吗'
  })
    .then(async () => {
      try {
        await delAddress(userId, Number(addressId))
        showDialog({
          title: '提示',
          message: '删除成功'
        }).then(() => {
          getAddressList()
        })
      } catch (error) {
        //
      }
    })
    .catch(() => {
      // on cancel
    })
}
// 选择地址后跳转到订单结算页
const onSelectAddress = (addressId: number) => {
  setTimeout(() => {
    if (shopId) {
      router.replace({
        name: 'orderComfirmation',
        params: {
          shopId: Number(shopId)
        },
        query: {
          addressId
        }
      })
    } else {
      router.replace({
        name: 'cartOrderComfirmation',
        query: {
          addressId
        }
      })
    }
  }, 10)
  history.back()
}
</script>
<template>
  <div class="AddressPage">
    <!-- 顶部导航 -->
    <div class="topBar">
      <van-nav-bar title="选择收货地址" left-arrow @click-left="goback">
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 地址 -->
    <div class="userAddress">
      <div
        class="addressItem"
        v-for="item in addressList"
        :key="item.addressId"
        @click="onSelectAddress(Number(item.addressId))"
      >
        <div class="addressItem-title">
          <div class="text">
            {{ item.area.split('/').join('') + item.detailsAddress }}
          </div>
          <span class="label" v-if="item.isDefault">{{
            item.isDefault ? '默认' : ''
          }}</span>
        </div>
        <div class="addressItem-bottom">
          <div class="reciever">
            <span class="name">{{ item.receiver }}</span>
            <span class="phone">{{ item.phone }}</span>
          </div>
          <div class="control">
            <div
              class="delete"
              @click.stop="
                deleteAddress(userStore.userInfo.userId, Number(item.addressId))
              "
            >
              <van-icon name="delete-o" size="4.27vw" color="#4F5C70" />
            </div>
            <div class="edit" @click.stop="onUpdate(item.addressId as number)">
              <van-icon name="edit" size="4.27vw" color="#4F5C70" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加收货地址 -->
    <div class="addAddress" @click="toAddAddress">
      <div class="add">
        <van-icon name="plus" size="4.27vw" color="var(--theme-color)" />
        <span>添加收货地址</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.AddressPage {
  height: 100vh;
  overflow-y: scroll;
  background-color: #f7f8fa;
  .userAddress {
    margin-top: 10px;
    margin: 12px 16px 62px 16px;
    background: #ffffff;
    border-radius: 4px;
    .addressItem {
      padding: 12px 16px 10px 20px;
      &-title {
        display: flex;
        align-items: center;
        .text {
          max-width: 260px;
          min-height: 26px;
          font-size: 14px;
          font-weight: 600;
          color: #051733;
          line-height: 26px;
          margin-right: 11px;
        }
        span {
          display: inline-block;
          width: 35px;
          height: 20px;
          text-align: center;
          border: 1px solid var(--theme-color);
          color: var(--theme-color);
          background: rgba(255, 68, 91, 0.1);
          border-radius: 2px;
          line-height: 20px;
          transform: scale(0.85);
        }
      }
      &-bottom {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid #f2f3f5;
        .reciever {
          flex: 1;
          height: 20px;
          font-size: 14px;
          color: #4f5c70;
          line-height: 20px;
          margin-top: 5px;
          .name {
            margin-right: 12px;
          }
        }
        .control {
          display: flex;
          .delete {
            margin-right: 16px;
          }
        }
      }
    }
  }
  .addAddress {
    position: fixed;
    bottom: 50px;
    z-index: 10;
    width: 100%;
    height: 62px;
    box-sizing: border-box;
    background-color: #f7f8fa;
    display: flex;
    justify-content: center;
    .add {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 327px;
      height: 46px;
      border-radius: 23px;
      border: 1px solid var(--theme-color);
      span {
        height: 22px;
        font-size: 14px;
        color: var(--theme-color);
        line-height: 22px;
        margin-left: 4px;
      }
    }
  }
}
</style>
