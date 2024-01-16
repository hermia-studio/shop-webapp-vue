// 返回的每一项数据类型
export interface FruitItem{
    id:number,
    name:string,
    price:number,
    benefits:string
}
// 返回的数据_data的类型
export type FruitList=Array<FruitItem>

//通用的接口
export interface IResponseData{
    code:number,
    msg:string,
    code:FruitList
}

// 登录的信息
export interface IUserInfo{
    username:string,
    password:string
}
// 登录返回的数据
export interface ILogin{
    token:string,
    userInfo:IUserInfo
}