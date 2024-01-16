<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
import { useToggle } from '@vueuse/core'
import { ref } from 'vue'
import { showLoadingToast, closeToast, showDialog } from 'vant'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import useSmsCode from '@/use/UseSmsCode'
import { PHONE_REG, USERNAME_REG, PWD_REG, SmsCode_REG } from '@/utils/regular'
import {
  phoneIsExisted,
  userNameIsExisted,
  registerCodeSend,
  RegisterCodeCheck,
  userRegister
} from '@/api/register'
// 返回按钮
const goback = () => {
  router.back()
}
// 密码显隐
const [isShowPwd, getPwd] = useToggle(true)
const pwd = ref('')

// 表单校验
const phoneNum = ref('')
const username = ref('')
const SmsCode = ref('')

// 异步请求
const asyncPhone = (val: string) =>
  new Promise<boolean>((resolve) => {
    showLoadingToast('验证中...')
    phoneIsExisted(Number(val))
      .then((res) => {
        resolve(!res)
      })
      .catch(() => {
        resolve(false)
      })
  }).finally(() => {
    closeToast()
  })
const asyncUserName = (val: string) =>
  new Promise<boolean>((resolve) => {
    showLoadingToast('验证中...')
    userNameIsExisted(val)
      .then((res) => {
        resolve(!res)
      })
      .catch(() => {
        resolve(false)
      })
  }).finally(() => {
    closeToast()
  })
const asyncSmsCode = (val: string) =>
  new Promise<boolean>((resolve) => {
    showLoadingToast('验证中...')
    RegisterCodeCheck(Number(phoneNum.value), val)
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
  getCode(registerCodeSend, Number(phoneNum.value))
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
    // 勾选后即注册成功
    await userRegister({
      phone: Number(phoneNum.value),
      username: username.value,
      password: pwd.value,
      code: SmsCode.value
    })
    router.push('/')
  } catch (error) {
    //注册失败
  }
}
</script>

<template>
  <div class="registerPage">
    <div class="topBar">
      <van-nav-bar title="注册" left-arrow @click-left="goback">
        <template #right>
          <van-icon name="ellipsis" size="7.46vw" color="#000" />
        </template>
      </van-nav-bar>
    </div>
    <div class="registerBody">
      <div class="decoration">
        <div class="decoration-text">
          <p>注册账号</p>
          <img src="@/assets/images/register/pho_line.png" alt="黄色渐变图" />
        </div>
        <div class="decoration-icon">
          <img src="@/assets/images/register/pho_buy.png" alt="购物车" />
        </div>
      </div>
      <div class="registerForm">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <h3 class="title">手机号</h3>
            <van-field
              v-model="phoneNum"
              autocomplete="off"
              name="pattern"
              placeholder="填写你常用的手机号码作为登陆账号"
              :rules="[
                { required: true, message: '请填写手机号' },
                { pattern: PHONE_REG, message: '手机号格式不正确' },
                { validator: asyncPhone, message: '该手机号已注册' }
              ]"
            />

            <h3 class="title">用户名</h3>
            <van-field
              v-model="username"
              name="validator"
              autocomplete="off"
              placeholder="6-18位英文字母或数字"
              :rules="[
                { required: true, message: '请填写用户名' },
                { pattern: USERNAME_REG, message: '用户名格式不正确' },
                { validator: asyncUserName, message: '该用户名已注册' }
              ]"
            />
            <h3 class="title">密码</h3>
            <van-field
              v-model="pwd"
              name="validatorMessage"
              autocomplete="off"
              type="password"
              trigger="onChange"
              placeholder="8-10位英文、数字、符号，区分大小写"
              :rules="[
                { required: true, message: '请填写密码' },
                { pattern: PWD_REG, message: '密码格式不正确' }
              ]"
            >
              <template #extra>
                <!-- 隐藏 -->
                <span v-if="isShowPwd" @click="getPwd()">
                  <van-icon name="closed-eye" />
                </span>
                <!-- 显示 -->
                <span v-else @click="getPwd()">
                  <van-icon name="eye-o" />
                </span>
                <input
                  v-model="pwd"
                  type="text"
                  autocomplete="off"
                  class="pwd"
                  placeholder="8-16位英文、数字、符号，区分大小写"
                  v-if="!isShowPwd"
                />
              </template>
            </van-field>
            <h3 class="title">短信验证码</h3>
            <van-field
              v-model="SmsCode"
              name="asyncValidator"
              placeholder="填写短信验证码"
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
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            class="registerBtn"
          >
            注册
          </van-button>
        </van-form>
        <div class="footer">
          <van-checkbox v-model="toSure">
            <p>我已阅读并同意<a>《隐私协议》</a>和<a>《免责声明》</a></p>
          </van-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.registerPage {
  --van-nav-bar-height: 44px;
  .van-nav-bar__title {
    color: #000;
    font-size: 18px;
  }
  .van-nav-bar .van-icon {
    color: #000;
    font-size: 20px;
  }
  --van-cell-group-inset-padding: 0;
  --van-cell-vertical-padding: 0px;
  --van-cell-horizontal-padding: 20px 0;
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
.registerPage {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
  overflow: auto;
  .registerBody {
    width: 100%;
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
    .registerForm {
      height: 550px;
      padding: 134px 24px 0px;
      .title {
        font-size: 14px;
        padding: 20px 0 5px 20px;
        font-weight: 400;
      }
      input.pwd {
        position: absolute;
        left: 18px;
        top: 8px;
        width: 270px;
        border: none;
        background-color: #fff;
      }
      input.pwd::placeholder {
        color: #b4b9c1;
        font-size: 12px;
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
    }
  }
}
</style>
