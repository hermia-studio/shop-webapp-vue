<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { areaList } from '@/assets/data/data.js'
import { addAddress, getAddress, updateAddress } from '@/api/address'
import { showDialog } from 'vant'
import type { IAddressItem } from '@/types/Address'
const router = useRouter()
import { useInfoStore } from '@/stores/userInfo'
const userStore = useInfoStore()
// 顶部返回
const goback = () => {
  router.back()
}
const reciever = ref('')
const phone = ref('')
const detailAddress = ref('')
// 省市区选择
// 省市区数据的类型
interface IArearList {
  text: string
  value: string
  children: IArearList[]
}
const result = ref('') //显示选择后的省市区数据
const showArea = ref(false) //弹窗显隐
const areaCode = ref('110101') //选择器的默认初始的地区
const onConfirm = ({ selectedOptions }: { selectedOptions: IArearList[] }) => {
  showArea.value = false
  result.value = selectedOptions.map((item) => item.text).join('/')
}
const checked = ref(false)
const route = useRoute()
const { addressId } = route.query
// 保存
const onSubmit = () => {
  // 如果有addressId就是修改
  if (addressId) {
    onUpdate()
  } else {
    // 如果没有就是新增
    addAddressInfo()
  }
}
// 新增收货地址
const addAddressInfo = async () => {
  try {
    await addAddress({
      userId: userStore.userInfo.userId,
      receiver: reciever.value,
      area: result.value,
      areaCode: areaCode.value,
      detailsAddress: detailAddress.value,
      phone: phone.value,
      isDefault: checked.value
    })
    // 提示弹窗
    showDialog({
      title: '提示',
      message: '地址新增成功'
    }).then(() => {
      // 跳转到选择收货地址
      history.back()
    })
  } catch (error) {
    //添加失败
    showDialog({
      title: '提示',
      message: '地址添加失败'
    }).then(() => {})
  }
}

// 修改收货地址前 先根据addressId获取初始数据
const getAddressData = async () => {
  if (addressId) {
    try {
      const item = (await getAddress(
        userStore.userInfo.userId,
        Number(addressId)
      )) as IAddressItem
      reciever.value = item.receiver
      phone.value = item.phone
      result.value = item.area
      areaCode.value = item.areaCode
      detailAddress.value = item.detailsAddress
      checked.value = item.isDefault
    } catch (error) {
      //
    }
  }
}
getAddressData()
// 修改地址
const onUpdate = async () => {
  try {
    await updateAddress({
      userId: userStore.userInfo.userId,
      addressId: Number(addressId),
      receiver: reciever.value,
      phone: phone.value,
      area: result.value,
      areaCode: areaCode.value,
      detailsAddress: detailAddress.value,
      isDefault: checked.value
    })
    showDialog({
      title: '提示',
      message: '地址修改成功'
    }).then(() => {
      // 跳转到选择收货地址
      history.back()
    })
  } catch (error) {
    //更新失败
    showDialog({
      title: '提示',
      message: '地址更新失败'
    }).then(() => {})
  }
}
</script>
<template>
  <div class="EditAddressPage">
    <!-- 顶部导航 -->
    <div class="topBar">
      <van-nav-bar
        :title="addressId ? '更新收货地址' : '新增收货地址'"
        left-arrow
        @click-left="goback"
      >
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 地址表单 -->
    <div class="editForm">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="reciever"
            name="收货人"
            label="收货人"
            placeholder="请填写收货人"
            :rules="[{ required: true, message: '请填写收货人' }]"
          />
          <van-field
            v-model="phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写收货人手机号' }]"
          />
          <van-field
            v-model="result"
            is-link
            readonly
            name="area"
            label="地区选择"
            placeholder="点击选择省市区"
            :rules="[{ required: true, message: '请选择省市区' }]"
            @click="showArea = true"
          />
          <van-popup v-model:show="showArea" position="bottom">
            <van-area
              :area-list="areaList"
              v-model="areaCode"
              @confirm="onConfirm"
              @cancel="showArea = false"
            />
          </van-popup>

          <van-field
            v-model="detailAddress"
            name="详细地址"
            label="详细地址"
            placeholder="详细地址"
            :rules="[{ required: true, message: '请填写详细地址' }]"
          />
        </van-cell-group>
        <div class="save">
          <van-button
            class="saveBtn"
            round
            block
            type="primary"
            native-type="submit"
          >
            保存
          </van-button>
        </div>
      </van-form>
      <div class="default">
        <span>设为默认收货地址</span>
        <van-checkbox
          v-model="checked"
          icon-size="4.27vw"
          checked-color="var(--theme-color)"
        ></van-checkbox>
      </div>
    </div>
  </div>
</template>
<style>
.EditAddressPage {
  .van-cell-group--inset {
    margin: 0;
  }
  .van-cell {
    min-height: 31px;
    padding: 0;
    margin-bottom: 16px;
    .van-field__label {
      width: 56px;
      margin-right: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #051733;
      padding: 0 0 16px 0;
    }
    .van-cell__value {
      font-size: 14px;
      color: #4f5c70;
      border-bottom: 1px solid #fafafb;
      padding: 0 0 16px 0;
    }
  }
  .van-cell:after {
    display: none;
  }
  .van-button {
    position: fixed;
    bottom: 8px;
    left: 24px;
    z-index: 10;
    width: 327px;
    height: 46px;
    background: #ff445b;
    border-radius: 23px;
    border: 0;
  }
}
</style>
<style scoped lang="scss">
.EditAddressPage {
  background-color: #f7f8fa;
  height: 100vh;

  .editForm {
    margin: 12px 16px 0 12px;
    background-color: #fff;
    padding: 20px;
    .default {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20px;
      span {
        font-size: 14px;
        color: #051733;
      }
    }
  }
  .save {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 62px;
    background: #f7f8fa;
  }
}
</style>
