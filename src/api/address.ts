import axios from "./base"
import type {IAddress,IAddressItem} from "@/types/Address"
// 获取收货地址
export function getAddress(userId:number,addressId?:number){
    return axios.get<IAddress,IAddress>('/address',{
        params:{
            userId,
            addressId
        }
    })
}
// 新增地址
export function addAddress(address:IAddressItem){
    return axios.post('address',address)
}
// 修改地址
export function updateAddress(address:IAddressItem){
    return axios.put<IAddressItem,IAddressItem>('address',address)
}
// 删除地址
export function delAddress(userId:number,addressId:number){
    return axios.delete<IAddressItem,IAddressItem>('address',{
        data:{
            userId,
            addressId
        }
    })
}
// 获取默认地址
export function defaultAddress(userId:number){
    return axios.get<IAddressItem,IAddressItem>('address/default',{
        params:{
            userId
        }
    })
}