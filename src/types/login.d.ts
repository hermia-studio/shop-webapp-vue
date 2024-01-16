// 登录时输入的参数类型
export interface IUserLogin{
    phone:number,
    code:string
}
// 登录时返回的用户信息类型
export interface IUserInfo{
    userId:number,
    phone?:number,
    username?:string,
    nickname:string,
    avatarUrl:string 
}
// 登录时 返回的数据类型
export interface IResponseLoginData{
    userInfo:IUserInfo,
    token:string
}