<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref } from 'vue'
import { showLoadingToast, closeToast, showDialog } from 'vant'
import useSmsCode from '@/use/UseSmsCode'
import { PHONE_REG, SmsCode_REG } from '@/utils/regular'
import { loginCodeCheck, loginCodeSend, userSmSLogin } from '@/api/login'
import { useInfoStore } from '@/stores/userInfo'
// 创建仓库
const userInfoStore = useInfoStore()
// 返回按钮
const goback = () => {
  router.back()
}

// 表单校验
const phoneNum = ref('')
const SmsCode = ref('')

// 验证验证码是否有效
const asyncSmsCode = (val: string) =>
  new Promise<boolean>((resolve) => {
    showLoadingToast('验证中...')
    loginCodeCheck(Number(phoneNum.value), val)
      .then((res) => {
        resolve(res.ACK === 'ok' ? true : false)
      })
      .catch(() => {
        resolve(false)
      })
  }).finally(() => {
    closeToast()
  })
// 发送验证码
const { isShowCode, time, getCode } = useSmsCode()
const onGetCode = () => {
  getCode(loginCodeSend, Number(phoneNum.value))
}

// 协议
const toSure = ref(false)
const onSubmit = async () => {
  // 提交前先勾选协议
  if (toSure.value !== true) {
    showDialog({ message: '请先同意相关条款' })
    return
  }
  try {
    // 登录成功
    let result = await userSmSLogin({
      phone: Number(phoneNum.value),
      code: SmsCode.value
    })
    // 将返回的用户信息和token保存在localStorage和全局
    userInfoStore.addUserInfo(result)
    // 跳转到首页
    router.push('/')
  } catch (error) {
    //登录失败
  }
}
</script>

<template>
  <div class="loginPage">
    <div class="topBar">
      <van-nav-bar title="登录" left-arrow @click-left="goback">
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <div class="loginBody">
      <div class="decoration">
        <div class="decoration-text">
          <p>验证码登录</p>
          <img src="@/assets/images/register/pho_line.png" alt="黄色渐变图" />
        </div>
        <div class="decoration-icon">
          <img src="@/assets/images/register/pho_buy.png" alt="购物车" />
        </div>
      </div>
      <div class="loginForm">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <h3 class="title">手机号</h3>
            <van-field
              v-model="phoneNum"
              autocomplete="off"
              name="pattern"
              placeholder="请输入手机号"
              :rules="[
                { required: true, message: '请填写手机号' },
                { pattern: PHONE_REG, message: '手机号格式不正确' }
              ]"
            />
            <h3 class="title">短信验证码</h3>
            <van-field
              v-model="SmsCode"
              name="asyncValidator"
              placeholder="请输入手机验证码"
              autocomplete="off"
              :rules="[
                { required: true, message: '请填写验证码' },
                { pattern: SmsCode_REG, message: '该验证码格式不正确' },
                { validator: asyncSmsCode, message: '验证码无效' }
              ]"
            >
              <template #extra>
                <div class="code">
                  <div class="code-text" v-if="isShowCode" @click="onGetCode">
                    获取验证码
                  </div>
                  <div class="code-down" v-else>已发送( {{ time }}s )</div>
                </div>
              </template>
            </van-field>
          </van-cell-group>
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </van-form>
        <div class="footer">
          <van-checkbox v-model="toSure">
            <p>我已阅读并同意<a>《隐私协议》</a>和<a>《免责声明》</a></p>
          </van-checkbox>
        </div>
        <div class="info">
          <p>管理员账号：17369245127 密码：123456</p>
          <p>也可使用自己的手机号进行注册</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.loginPage {
  /* form表单 */
  --van-cell-group-inset-padding: 0;
  --van-cell-vertical-padding: 0px;
  --van-cell-horizontal-padding: 20px 0;
  --van-button-primary-background: var(--theme-color);
  .van-field__control {
    height: 42px;
    /* border: 1px solid #000; */
  }
  .van-field__control::placeholder {
    color: #b4b9c1;
    font-size: 12px;
  }
  .van-icon-closed-eye:before,
  .van-icon-eye-o:before {
    color: #b4b9c1;
    font-size: 16px;
    line-height: 42px;
  }
  .van-button--primary {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    width: 279px;
    height: 50px;
    background: var(--theme-color);
    border-radius: 25px;
    border: none;
    box-sizing: border-box;
  }
  .van-button:before {
    display: none;
  }
  .van-button--round {
    border-radius: 25px;
  }
  .van-form {
    position: relative;
    box-shadow: 0px 2px 30px 0px rgba(3, 51, 136, 0.15);
    border-radius: 8px;
  }
  .van-cell-group--inset {
    padding-bottom: 30px;
    border-radius: 8px;
    box-shadow: 0px 2px 30px 0px rgba(3, 51, 136, 0.15);
  }
}
</style>
<style scoped lang="scss">
.loginPage {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
  .loginBody {
    width: 100%;
    min-height: 605px;
    background-image: linear-gradient(
      to bottom,
      var(--theme-color) 230px,
      230px,
      #fff 100%
    );
    .decoration {
      .decoration-text {
        p {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          position: absolute;
          top: 118px;
          left: 24px;
        }
        img {
          width: 72px;
          height: 5px;
          position: absolute;
          top: 143px;
          left: 24px;
        }
      }
      .decoration-icon img {
        width: 161px;
        height: 161px;
        position: absolute;
        right: 25px;
        top: 69px;
        z-index: 3;
      }
    }
    .loginForm {
      min-height: 450px;
      position: relative;
      padding: 134px 24px 22px 24px;
      .title {
        font-size: 14px;
        padding: 20px 0 5px 20px;
        font-weight: 400;
      }
      .code {
        height: 42px;
        line-height: 42px;
        font-size: 12px;
        .code-text {
          color: #1472ff;
        }
        .code-down {
          color: #b4b9c1;
        }
      }
      .footer {
        width: 280px;
        margin: 0 auto;
        margin-top: 62px;
        font-size: 12px;
        p {
          color: #697485;
          a {
            color: #1472ff;
          }
        }
      }
      .info {
        margin: 30px;
        color: #999;
        p {
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
