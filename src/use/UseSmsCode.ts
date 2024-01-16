import { ref,onUnmounted } from 'vue'
import type { ISmsSendCode } from '@/types/register'
export default ()=>{
// 获取验证码
const isShowCode = ref(true)//获取验证码文字的显隐
const time = ref(60)
let timer: number
/**
 * 根据不同的接口发送验证码 （注册/登录）
 * @param smsSendCode 发送验证码的接口函数
 */
const getCode = (smsSendCode:(phone:number)=>Promise<ISmsSendCode>,phone:number) => {
  isShowCode.value =false
  timer = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timer)
      isShowCode.value = true
      time.value=60
    }
  }, 1000)
//发请求 获取验证码 需要用到传入的手机号
try {
  smsSendCode(phone)
} catch (error) {
  //
}
}
// 销毁时清理定时器
onUnmounted(() => {
  clearInterval(timer)
})

return {
    isShowCode,
    time,
    getCode
}
}
