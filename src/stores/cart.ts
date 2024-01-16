// UseCartStore 保存购物数据
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import type {IShopCartInfos,IGood} from '@/types/goods'
import {useInfoStore} from "./userInfo"
import {watch} from "vue"
const useStore=useInfoStore()
export const useCartStore=defineStore('cart',()=>{
    // 用来存储购物车信息
    let cartList=useLocalStorage(
      `${useStore.userInfo.userId}-cart`,
      new Map<number,IShopCartInfos>()
      )
      // 创建侦听器
      watch(
        ()=>useStore.userInfo.userId,
        (v)=>{
          cartList=useLocalStorage(
            `${v}-cart`,
            new Map<number,IShopCartInfos>()
            )
        }
      )
    // 增加购物数量
    const pushProductToCart=(shopId:number,shopName:string,goods:IGood)=>{
    // 先根据店铺id判断 是否存在
    const shopCartInfo=cartList.value.get(shopId)
    if(!shopCartInfo){
      goods.cartCount=1;
      goods.checked=true;
    // 如果不存在就新增一条
    cartList.value.set(shopId,{
        shopName,
        goodsList:[goods]
    })
    }else{
    // 如果存在就查goodsId
     const _goods=shopCartInfo.goodsList.find((v)=>v.goodsId===goods.goodsId)
     if(_goods){
        // 如果已经有该商品数据，就更新数量和状态
        _goods.cartCount++;
        _goods.checked=true
       }else{
        // 如果不存在 就给goodsList添加数据
        goods.cartCount=1;
        goods.checked=true;
        shopCartInfo.goodsList.push(goods)
       }
    }
}

    // 减少购物数量
    const reduceProductFromCart=(shopId:number,goodsId:string)=>{
        // 先找到店铺
        const shopInfos=cartList.value.get(shopId)
        if(shopInfos){
            const item=shopInfos.goodsList.find(v=>v.goodsId===goodsId)
            // 根据goodsId找商品
            if(item){
            // 如果存在该商品
            item.cartCount--;
            // 如果数量小于等于0就删除该商品数据 
            if(item.cartCount<=0){
              const index=shopInfos.goodsList.findIndex(v=>v.goodsId===goodsId)
              shopInfos.goodsList.splice(index,1)
                //如果店铺数据小于等于0就删除该店铺数据 
                if(shopInfos.goodsList.length===0){
                cartList.value.delete(shopId)
                 }
            }
            }
        }
    }
    // 根据shopId和goodsId获取某个店铺的某条商品的加购数量
    const getGoodsCartInfo=(shopId:number,goodsId:string)=>{
      // 先找到店铺
      const shopInfos=cartList.value.get(shopId)
      if(shopInfos){
        // 找商品
        const item=shopInfos.goodsList.find(v=>v.goodsId===goodsId)
          return item?item.cartCount:0
      }else{
        return 0
      }
    }

    // 返回某个店铺的购物车数据
    const getShopCartInfo=(shopId:number)=>{
        return cartList.value.get(shopId)
    }
    // 动态切换单选
    const toggleSelect=(shopId:number,goodsId:string)=>{
        const shopCartInfo=cartList.value.get(shopId)
        const item=shopCartInfo?.goodsList.find(v=>v.goodsId===goodsId)
        if(item){
        item?.checked?(item.checked=false):(item.checked=true)
        }
    }
    // 判断是否为全选
    const isAllSelect=(shopId:number)=>{
      const shopCartInfo=cartList.value.get(shopId)
      if(shopCartInfo){
        const goodsList=shopCartInfo.goodsList;
        for(let i=0;i<goodsList.length;i++){
          if(!goodsList[i].checked){
            return false
          }
        }
        return true
      }else{
        return false
      }
    }

    // 设置全选
    const setAllSelect=(shopId:number)=>{
      const shopCartInfo=cartList.value.get(shopId)
      if(shopCartInfo){
        shopCartInfo.goodsList.forEach(v=>{
          v.checked=true
        })
      }
    }

    // 设置全不选
    const cancleAllSelect=(shopId:number)=>{
      const shopCartInfo=cartList.value.get(shopId)
      if(shopCartInfo){
        shopCartInfo.goodsList.forEach(v=>{
          v.checked=false
        })
      }
    }

    // 动态切换全选
    const toggleAllSelect=(shopId:number)=>{
      // 检查是否为全选
      if(isAllSelect(shopId)){
        // 如果是全选
        cancleAllSelect(shopId)
      }else{
        setAllSelect(shopId)
      }
    }
    
    // 计算店铺加购的商品数量
    const cartGoodsNum=(shopId:number)=>{
      const shopCartInfo=cartList.value.get(shopId)
      if(shopCartInfo){
        return shopCartInfo.goodsList.reduce((prev,next)=>prev+next.cartCount,0)
      }else{
        return 0
      }
    }

    // 计算购物车内选中的商品数量
    const selectGoodsNum=(shopId:number)=>{
      const shopCartInfo=cartList.value.get(shopId)
      if(shopCartInfo){
        return shopCartInfo.goodsList.reduce((prev,next)=>{
          if(next.checked){
            return prev+next.cartCount
          }else{
            return prev
          }
        },0)
      }else{
        return 0
      }
    }

    // 计算单个店铺中选中商品的总价格
    const TotalPrice=(shopId:number)=>{
      const shopCartInfo=cartList.value.get(shopId)
      let newPriceTotal=0;
      let oldPriceTotal=0;
      if(shopCartInfo){
        shopCartInfo.goodsList.forEach((v)=>{
          if(v.checked){
            oldPriceTotal+=v.cartCount*v.oldPrice
            if(v.cartCount>v.discount.limitCount){
              // 如果超出限制数量
              newPriceTotal+=v.discount.limitCount*v.price+(v.cartCount-v.discount.limitCount)*v.oldPrice
            }else{
              // 如果没超过
              newPriceTotal+=v.cartCount*v.price
            }
          }
        })
      }
      return {
        newPriceTotal:Number(newPriceTotal.toFixed(2)),
        oldPriceTotal:Number(oldPriceTotal.toFixed(2))
      }
    }

    // 清空购物车
    const clearCart=(shopId:number)=>{
      cartList.value.delete(shopId)      
    }

    // 获取店铺已选中的商品信息，用于结算
    const selectToPayGoods=(shopId:number)=>{
      const shopCartInfo=cartList.value.get(shopId)
      if(shopCartInfo){
       const filter=shopCartInfo.goodsList.filter((v)=>v.checked)
      return {
        shopId,
        shopName:shopCartInfo.shopName,
        goodsList:filter
      }
      }else{
        return null
      }     
    }

    // 返回购物车列表数据
    const getCartList=()=>{
      return cartList
    }

    // 计算所有店铺中选中商品的总价格
    const getAllCartPrice=()=>{
     let newPriceTotal=0;
     let oldPriceTotal=0;
     for(const {goodsList} of cartList.value.values()){
       goodsList.forEach((v)=>{
         if(v.checked){
           oldPriceTotal+=v.cartCount*v.oldPrice
           if(v.cartCount>v.discount.limitCount){
             // 如果超出限制数量
             newPriceTotal+=v.discount.limitCount*v.price+(v.cartCount-v.discount.limitCount)*v.oldPrice
           }else{
             // 如果没超过
             newPriceTotal+=v.cartCount*v.price
           }
         }
       })
     }
     return {
       newPriceTotal:Number(newPriceTotal.toFixed(2)),
       oldPriceTotal:Number(oldPriceTotal.toFixed(2))
     }
   }

  //  获取所有店铺以及被选中的商品 map结构
   const getAllCheckedGoodsList=()=>{
    const map=new Map<number,IShopCartInfos>()
    for(const [key,value] of cartList.value.entries()){
      // 找到对应店铺下的所有被选中商品
      const goodsList=value.goodsList.filter((v)=>v.checked)
      // 判断goodsList是否为空
      if(goodsList.length>0){
        const shopInfos={...value}
        shopInfos.goodsList=goodsList
        map.set(key,shopInfos)
      }
    }
    return map
   }
  // 删除购物车中已支付/取消支付的商品
   const clearAllCheckedFromCart=()=>{
    // 遍历购物车数据
    for(const [key,value] of cartList.value.entries()){
      const goodsList=value.goodsList.filter((v=>!v.checked))
      if(goodsList.length>0){
        // 如果购物车内还有没选择的商品，则留下
        value.goodsList=goodsList
        cartList.value.set(key,value)
      }else{
        // 当前店铺没有加购的商品 就删除
        cartList.value.delete(key)
      }
    }
   }
  //  删除购物车中的商品
  const deleteCartGoods=(shopId:number,goodsId:string)=>{
    const shopInfos=cartList.value.get(shopId)
    if(shopInfos){
      const index=shopInfos?.goodsList.findIndex((v)=>v.goodsId===goodsId) as number
      if(index>=0){
        shopInfos?.goodsList.splice(index,1)
        if(shopInfos?.goodsList.length===0){
          cartList.value.delete(shopId)
        }
      }
    }
  }

 return {
    cartList,
    pushProductToCart,
    reduceProductFromCart,
    getGoodsCartInfo,
    getShopCartInfo,
    toggleSelect,
    isAllSelect,
    toggleAllSelect,
    cartGoodsNum,
    selectGoodsNum,
    TotalPrice,
    clearCart,
    selectToPayGoods,
    getCartList,
    getAllCartPrice,
    getAllCheckedGoodsList,
    clearAllCheckedFromCart,
    deleteCartGoods
 }
})