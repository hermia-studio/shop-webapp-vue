import { createRouter, createWebHistory } from 'vue-router'
import {auth} from "@/api/auth"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',  //首页
      name: 'home',
      component:()=>import('@/views/home/HomeIndex.vue')
    },{
      path: '/cart',  //购物车
      name: 'cart',
      component:()=>import('@/views/cart/CartIndex.vue'),
      meta:{requireAuth:true}
    },{
      path: '/order',  //订单
      name: 'order',
      component:()=>import('@/views/order/OrderIndex.vue'),
      meta:{requireAuth:true}
    },{
      path: '/my',  //我的
      name: 'my',
      component:()=>import('@/views/my/MyIndex.vue')
    },{
      path: '/login',  //登录
      name: 'login',
      component:()=>import('@/views/login/LoginIndex.vue')
    },{
      path: '/register',  //注册
      name: 'register',
      component:()=>import('@/views/register/RegisterIndex.vue')
    },{
      path: '/shop/:shopId',  //商家店铺
      name: 'shop',
      component:()=>import('@/views/shop/ShopIndex.vue'),
      meta:{requireAuth:true}
    },{
      path: '/goods-details/:shopId/:goodsId',  //商品详情
      name: 'goods',
      component:()=>import('@/views/goods/GoodsIndex.vue'),
      meta:{requireAuth:true}
    },{
      path: '/order/comfirmation/:shopId',  //店铺订单支付
      name: 'orderComfirmation',
      component:()=>import('@/views/order/OrderComfirmation.vue'),
      meta:{requireAuth:true}
    },{
      path: '/order/comfirmation',  //首页订单支付
      name: 'cartOrderComfirmation',
      component:()=>import('@/views/order/CartOrderComfirmation.vue'),
      meta:{requireAuth:true}
    },{
      path: '/address',  //地址
      name: 'address',
      component:()=>import('@/views/address/AddressIndex.vue'),
      meta:{requireAuth:true} },{
      path: '/address/edit',  //编辑地址
      name: 'addressEdit',
      component:()=>import('@/views/address/AddressEdit.vue'),
      meta:{requireAuth:true}
    }
  ]
})
// 全局前置守卫
router.beforeEach(async(to)=>{
  // 判断是否需要身份认证
  if(to.meta.requireAuth){
  // 如果需要进行身份验证
  try{
    await auth()
    return true
  }catch{
    // 没有通过验证则跳转到登录页
    router.push('/login')
  }

  }else{
    // 不需要则放行
    return true
  }

})

export default router
