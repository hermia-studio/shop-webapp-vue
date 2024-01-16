import axios from "./base"
import type { IOrderItem } from "@/types/order"
// 生成订单
export function generateOrder(orderItem:IOrderItem|IOrderItem[]){
    return axios.post<IOrderItem,IOrderItem>('/generate/order',orderItem)
}
// 获取所有订单
export function getAllOrderList(userId:number){
    return axios.get<IOrderItem[],IOrderItem[]>('/order/list',{
        params:{
            userId
        }
    })
}
