import axios from "./base"
import type {IBannerList} from "@/types/home"
import type {IMenuList} from "@/types/home"
import type { ISeckillTimerList } from "@/types/home";
import type {ISearchShopListData} from "@/types/search"
// banner
export function getBannerList(){
    return axios.get<IBannerList,IBannerList>('/banner')
}
// 分类菜单
export function getMenuList(){
    return axios.get<IMenuList,IMenuList>('/menu')
}
// 秒杀商品数据
export function getSeckillTimer(){
    return axios.get<ISeckillTimerList,ISeckillTimerList>('/seckill-timer')
}
// 分类推荐
export function getRecommend(category:number,page?:number,limit?:number){
    return axios.get<ISearchShopListData,ISearchShopListData>('/recommend',{
        params:{
            category,
            page,
            limit
        }
    })
}