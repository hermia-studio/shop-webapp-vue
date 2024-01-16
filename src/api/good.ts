import axios from "./base"
import type { IGoodsDetail } from "@/types/goods"

// 获取商品详情数据
export function getGoodsDetails(shopId:number,goodsId:string){
    return axios.get<IGoodsDetail,IGoodsDetail>('/goods/details',{
        params:{
            shopId,
            goodsId
        }
    
    })
}

