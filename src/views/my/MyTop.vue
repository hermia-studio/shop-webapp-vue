<script setup lang="ts">
// 编程式导航：获取router实例
import { useRouter } from 'vue-router'
// 导入用户信息仓库
import { useInfoStore } from '@/stores/userInfo'
const userInfoStore = useInfoStore()
const router = useRouter()
const onRegister = () => {
  router.push('/register')
}
// 登录
const onLogin = () => {
  router.push('/login')
}
// 退出登录
const unLogin = () => {
  userInfoStore.removeUserInfo()
}
</script>
<template>
  <div class="myTop">
    <div class="user">
      <div class="avater">
        <img :src="userInfoStore.userInfo.avatarUrl" alt="用户头像" />
      </div>
      <div class="text">
        <p>{{ userInfoStore.userInfo.nickname }}</p>
        <span>{{
          userInfoStore.userInfo.phone
            ? '账号：' + userInfoStore.userInfo.phone
            : '登录后即可查看'
        }}</span>
      </div>
      <div
        class="register"
        v-if="userInfoStore.userInfo.phone ? false : true"
        @click="onRegister"
      >
        注册
      </div>
      <div class="unLogin" v-else @click="unLogin">退出</div>
    </div>
    <div class="statu">
      <div
        class="btn-login"
        v-if="userInfoStore.userInfo.phone ? false : true"
        @click="onLogin"
      >
        立即登录
      </div>
      <div class="myItem" v-else>
        <div class="item store">
          <div class="num">26</div>
          <div class="text">关注店铺</div>
        </div>
        <div class="item goods">
          <div class="num">48</div>
          <div class="text">收藏商品</div>
        </div>
        <div class="item history">
          <div class="num">11</div>
          <div class="text">我的足迹</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.myTop {
  .user {
    display: flex;
    align-items: center;
    height: 92px;
    padding: 16px 12px;
    background: #ffffff;
    border-radius: 2px;
    .avater {
      width: 60px;
      height: 60px;
      margin-right: 12px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .text {
      flex-grow: 1;
      p {
        font-size: 16px;
        font-weight: 800;
        height: 24px;
        line-height: 24px;
        margin-bottom: 2px;
      }
      span {
        font-size: 12px;
        color: #818b98;
        height: 20px;
        line-height: 20px;
      }
    }
    .register,
    .unLogin {
      width: 52px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      border-radius: 4px;
      border: 1px solid #dadce1;
      font-size: 14px;
      font-family: MicrosoftYaHei;
    }
    .right-arrow {
      width: 19px;
      height: 19px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .statu {
    margin: 12px 0;
    background: linear-gradient(270deg, #ff7159 0%, #ff445b 100%);
    color: #ffffff;
    border-radius: 6px;
    .btn-login {
      height: 40px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
    }
    .myItem {
      display: flex;
      height: 79px;
      font-size: 12px;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33.3%;
        height: 100%;
        .num {
          font-size: 16px;
          margin-bottom: 9px;
        }
        .text {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
