// 单个商品数据
export interface IGood{
    goodsId:string,
    name:string,
    imgUrl:string,
    sellCount:number,
    rating:string,
    price:number,
    oldPrice:number,
    tips:string[],
    discount:{
        type:number,
        value:number,
        limitCount:number
    },
    cartCount:number,
    checked:boolean,
}
// 店铺所有商品
export interface IGoodsItem{
    typeId:number,
    typename:string,
    icon:string,
    goods:IGood[]
}
// shop/goods接口返回 店铺数据
export interface IShopGoods{
    shopId:number,
    shopName:string,
    data:IGoodsItem[]
}
// 本地存储中的购物车数据
export interface IShopCartInfos{
    shopName:string,
    goodsList:IGood[]
}
// 去结算的商品
export interface IToPayGoods{
    shopId:number,
    shopName:string,
    goodsList:IGood[]
}
// 商品详情页
export interface IGoodsDetail{
    shopId:number,
    shopName:string,
    goods:IGood,
}