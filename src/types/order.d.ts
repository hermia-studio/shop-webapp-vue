import type { IGoods } from './goods'
import type { IShopCartInfos } from './goods'

export interface IOrderList {
  shopId: number
  shopName: string
  goodsList: IGoods[]
}

export interface IOrderItem extends IShopCartInfos {
  // shopName:string,
  // goodsList:IGood[]
  userId?: number
  orderId?: number
  shopId?: number
  addressId?: number
  isCanceled?: boolean
}