export interface IDiscount{
    type:number
    label:string
    content:{count:number,if:number}[]
}
export interface IRedbag{
    type:number
    count:number
    if:string
    label:string
}

export interface IService{
    type:number
    value:string
}
// data数据类型
export interface ISearchShopItem{
    shopId:number,
    category:number,
    avatarUrl:string,
    shopBg:string,
    shopName:string,
    keyword:string[],
    score:number,
    monthlySales:number,
    deliveryTime:string,
    deliveryDistance:string,
    deliveryStratingPrice:string,
    deliveryStrategy:string,
    deliveryTags:string,
    comments:string[],
    tops:string,
    services:IService[],
    redbags:IRedbag[],
    discounts:IDiscount[],
    announcement:string
}
// 搜索返回的类型
export interface ISearchShopListData{
    total:number
    data:ISearchShopItem[]
}
// 历史记录
export interface IHistoryItem {
    id: number
    keyword: string
  }
