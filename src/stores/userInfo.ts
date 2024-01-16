import {defineStore} from "pinia"
import { useLocalStorage } from "@vueuse/core"
import type {IUserInfo,IResponseLoginData} from "../types/login"
export const useInfoStore=defineStore("useInfo",()=>{
    //定义一个默认值
    const defaultInfo:IUserInfo={
        userId:0,
        nickname:"未登录",
        avatarUrl:'/images/avatar/default.png',
    }
    // 初始化userInfo的值 userInfo是一个ref
    const userInfo=useLocalStorage("userInfo",defaultInfo)
 
    // 添加用户信息：更新本地存储里的userInfo和token
    const addUserInfo=(result:IResponseLoginData)=>{
        userInfo.value=result.userInfo
        //将登录后返回的用户信息、token存在本地
        window.localStorage.setItem('token',result.token)
}
    // 移除用户信息 恢复默认
    const removeUserInfo=()=>{
        userInfo.value=defaultInfo
        // 清空token
        window.localStorage.setItem('token','')
    }
    return {
        userInfo,
        addUserInfo,
        removeUserInfo
    }

})