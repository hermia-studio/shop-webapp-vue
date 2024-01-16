import axios from "./base"
import type {ISearchShopItem} from "@/types/search"
import type {IShopGoods} from "@/types/goods"
export function shopDetailList(shopId:number){
    return axios.get<ISearchShopItem,ISearchShopItem>('shop/detail',{
        params:{
            shopId
        }
    })
}
export function shopGoodsList(shopId:number){
    return axios.get<IShopGoods,IShopGoods>('shop/goods',{
        params:{
            shopId
        }
    })
}