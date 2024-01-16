import  axios  from "./base";
import type {ISmsSendCode,ISmsSendCheck,IUserRegister} from "@/types/register"
// 检查手机号是否已注册
export function phoneIsExisted(phone:number){
    return axios.post<boolean,boolean>('/register/phone/check',{phone})
}
// 检查用户名是否已注册
export function userNameIsExisted(username:string){
    return axios.post<boolean,boolean>('/register/username/check',{username})
}
// 获取验证码
export function registerCodeSend(phone:number){
    return axios.post<ISmsSendCode,ISmsSendCode>('/register/code/send',{phone})
}

// 检测验证码
export function RegisterCodeCheck(phone:number,code:string){
    return axios.post<ISmsSendCheck,ISmsSendCheck>('/register/code/check',{phone,code})
}
// 用户注册
export function userRegister({phone,username,password,code}:IUserRegister){
    return axios.post('/register/code/check',{phone,username,password,code})
}