// banner数据
export interface IBannerItem{
    id:number,
    advUrl:string,
    imageUrl:string
}
export type IBannerList=IBannerItem[]

// 菜单数据
export interface IMenuItem{
    id:number,
    title:string,
    imgUrl:string,
    href:string
}
export type IMenuList=IMenuItem[]
// 秒杀数据
export interface ISeckillTimerItem{
    shopId: number,
    goodId: number,
    name: string,
    imgUrl: string,
    rating: string,
    price: number,
    oldPrice: number
}
export interface ISeckillTimerList{
    time:number,
    goods:ISeckillTimerItem[]
}
// 首页分类推荐
export interface ICategoryItem {
    id: number
    title: string
    category: number
    component: string
}
export type ICategoryList=ICategoryItem[]