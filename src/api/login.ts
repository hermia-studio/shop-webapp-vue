import  axios  from "./base";
import type {ISmsSendCode,ISmsSendCheck} from "@/types/register"
import type {IUserLogin,IResponseLoginData} from "@/types/login";
// 检测验证码是否有效
export function loginCodeCheck(phone:number,code:string){
    return axios.post<ISmsSendCheck,ISmsSendCheck>('/login/code/check',{phone,code})
}
// 获取验证码
export function loginCodeSend(phone:number){
    return axios.post<ISmsSendCode,ISmsSendCode>('/login/code/send',{phone})
}
// 用户登录
export function userSmSLogin({phone,code}:IUserLogin){
    return axios.post<IResponseLoginData,IResponseLoginData>('/smsLogin',{phone,code})
}