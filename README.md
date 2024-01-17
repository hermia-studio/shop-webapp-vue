# shop-webApp-vue
**Read this in other languages: [中文](README.md),[English](README_en.md) .**
## 项目介绍
欢迎访问：https://web.hermiablog.com/
>登录与注册
- 可使用以下手机号和验证码访问
  - 手机号：17369245121；验证码：123456
  - 手机号：17369245122；验证码：123456
- 也可以用自己的手机号注册

>更多
- github地址：https://github.com/hermiablog/shopApp (包括前后端数据)
- 欢迎光临我的博客：https://hermiablog.com/

>手机扫码访问

<img src="https://github.com/hermiablog/shopApp/blob/main/screen/vueShop.png" style="width: 300px;">
<img src="https://github.com/hermiablog/shopApp/blob/main/screen/myblog.png" style="width: 300px;">

#### 项目技术栈
本次 Vue 项目用到的技术栈、构建工具、组件库、代码检查、代码格式化工具。如下表：

|工具|描述|版本|
|---|---|---|
|Node|JS 运行时环境|20.9.0|
|Vue|渐进式 JS 框架|3.3.10|
|TypeScript|具有类型语法的 JS	|5.2.0|
|Vite|前端构建工具|5.0.5|
|Vue Router|Vue.js 的官方路由|4.2.5|
|Pinia|Vue.js 状态管理库|2.1.7|
|Vant|移动端 Vue 组件库|4.8.0|
|VueUse|基于 Vue 组合式 API 的实用函数集合|10.7.0|
|ESLint|代码检查工具，统一代码规范|8.49.0|
|Prettier|代码格式化工具|3.0.3|
|json-server|模拟服务端接口数据	|0.17.4|
|jsonwebtoken|生成 和 校验 token|9.0.2|
|axios|异步请求|1.6.2|
|postcss|利用 JavaScript 的强大编程能力对 CSS 代码进行转换	|8.4.32|
|sass|CSS 预处理器|1.69.5|

#### 项目页面
本项目所涉及到的页面有：首页、购物车、订单、我的、商家店铺、商品详情、订单支付、登录、注册、地址管理、编辑地址、搜索页
<img src="https://github.com/hermiablog/shopApp/blob/main/screen/introduce.png" style="max-width: 100%;">

#### 项目功能
本项目中涉及到的一些功能主要用：
- 搜索功能
- 轮播图
- 弹出层和弹窗
- 倒计时
- 滚动菜单
- 滚动加载
- 下拉刷新
- 图片懒加载
- 单选与全选
- 加入购物车
- 地址管理（选择、新增、修改、删除、默认设置）
- 短信验证码登录与注册
- token 身份认证

#### 项目技术点
本项目所涉及到的技术栈和相关知识点，如下

>Vue3 框架
- 基础知识应用
- ref 和 reactive
- computed 和 watch
- 组件封装
- 自定义指令 directive
- composition API
- 生命周期
- VueUse 基本用法
- ESLint 和 Prettier 基础配置

>Vue Route4
- 基础用法
- 动态路由匹配
- 导航守卫

>Pinia 状态管理
- 基础用法
- state
- getter
- action
- 数据本地持久化(localstorage)

>构建工具 Vite
- Vite 构建项目
- 配置 eslint、prettier
- 设置请求代理

>TypeScript
- 基础用法
- 函数
- 接口 interface
- 类 Class
- 泛型

>Axios
- 创建 axios 实例
- get、post、put、deleted 请求
- axios 封装
- 请求和响应拦截器

>Vant 组件
- Icon 图标
- Popup 弹出层
- Checkbox 复选框
- Form 表单
- Search 搜索
- PullRefresh 下拉刷新
- Lazyload 懒加载
- List 列表
- Sticky 粘性布局
- Swipe 轮播
- IndexBar 索引栏
- NavBar 导航栏
- Tab 标签页
- Tabbar 标签栏
- Area 省市区选择
- Dialog 弹出框
- CountDown 倒计时

>服务器端
- json-server 模拟服务端接口数据
- Http 状态码与业务状态码
- jsonwebtoken 生成和校验 token
- 申请短信验证码接口

## 项目搭建过程
### 一、基础框架、准备工作
#### 开发环境初始化
>创建Vue项目，集成相关工具：TS、Vue Router、Pinia、ESLint、Prettier、Vant、VueUse等
- 执行以下代码，并开启相关功能
```
npm create vue@latest
```
>安装Vant组件
```
# Vue 3 项目，安装最新版 Vant
npm i vant
```
- 按需引入
```
# 通过 npm 安装
npm i @vant/auto-import-resolver unplugin-vue-components -D
```
- 配置插件:修改`vite.config.ts`配置文件
```
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
```
>安装VueUse
```
npm i @vueuse/core
```

#### 页面结构与路由
>页面结构梳理

|页面|路由|路由组件|
|--|--|--|
|首页|/|`/src/views/home/Index.vue`|
|购物车|/cart|`/src/views/cart/CartIndex.vue`|
|订单|/order|`/src/views/order/OrderIndex.vue`|
|我的|/my|`/src/views/my/MyIndex.vue`|
|登录|/login|`/src/views/login/LoginIndex.vue`|
|注册|/register|`/src/views/register/RegisterIndex.vue`|
|商家店铺|/shop/:shopId|`/src/views/shop/ShopIndex.vue`|
|商品详情|/goods-details/:shopId/:goodsId|`/src/views/goods/GoodsIndex.vue`|
|订单支付|/order/confirmation/:shopId|`/src/views/order/OrderComfirmation.vue`|
|地址管理|/address|`/src/views/address/AddressIndex.vue`|
|新增或修改地址|/address/edit|`/src/views/address/AddressEdit.vue`|

>路由配置
- 修改`router/index.ts`文件，配置路由

#### CSS样式处理
>安装`normalize.css`，用来处理不同浏览器的兼容
>- 注意：它并不是很全面
```
npm i normalize.css
```
- 在`main.ts`中引入
```
import "normailize.css"
```
>安装sass
- 安装sass css预处理器
```
npm install sass -D
```
>添加字体抗锯齿效果
- 在`App.vue`中添加以下样式
```
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smothing: grayscale; 
}
```
>公共样式文件
在`/src/assets`目录下新建`common.scss`文件，用于存放整个项目的公共样式
- 重置
- 设置通用样式
- 溢出文本省略等公共样式
- 设置苹方字体
  - 使用`@font-face`声明所需字体，format表示如果用户代理不支持指定的格式，就跳过下载字体资源
  - 在`font-family`中引用该字体

#### 移动端适配与浏览器兼容性处理
>vw布局——自动转换单位

使用`postcss-px-to-viewport-8-plugin`插件进行转换
- 安装
```
npm install postcss-px-to-viewport-8-plugin -D
```
- 配置：在根目录下新建`postcss.config.js`文件
```
module.exports = {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 375,//设计稿的视口宽度
      exclude: [/node_modules/],
      unitToConvert: 'px',
      minPixelValue: 1, //设置最小的转换数值
      selectorBlackList: [/^body$/], //需要忽略的 CSS 选择器
    }
  }
}
```

>CSS兼容性处理
- 安装autoprefixer插件——自动为css属性添加不同的浏览器前缀
```
npm i autoprefixer -D
```
- 在`postcss.config.js`文件中配置该插件
```
module.exports = {
  plugins: {
    'autoprefixer':{}
  }
}
```
- 在`package.json`中添加兼容到的浏览器版本
```
{
  "browserslist":[
    "Andriod>=4.0",
    "iOS>=7"
  ]
}
```

>JS兼容性处理
- 安装`@vitejs/plugin-legacy`插件，为打包后的JS文件提供浏览器兼容性支持
```
npm i @vitejs/plugin-legacy -D
```
- 必须同时安装 Terser，因为旧版插件使用 Terser 进行缩小
```
npm add -D terser
```
- 在`vite.config.js`文件中配置该插件
```
// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      //target放到package.json中
    }),
  ],
}
```
- 为了和css保持一样的兼容性版本，把兼容到的目标浏览器配置`targets`，添加到`package.json`的`browserslist`字段中
```
{
  "browserslist":[
    "Andriod>=4.0",
    "iOS>=7"
  ]
}
```

#### API接口调用设计
创建Axios实例
>我们需要通过axios发送大量HTTP请求，因此创建Axios实例将其中相同的配置放在一起
- 安装axios
```
npm install axios
```
- 新建`/src/api/base.ts`文件，来创建实例
```
import axios from 'axios'
const instance = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

export default instance
```
- 配置代理——修改`vite.config.ts`文件
```
server:{
  proxy:{
    '/api':'http://127.0.0.1:8888'
  }
}
```

>使用示例
- 新建`/src/api/test.ts`文件，引入axios实例，将接口封装成方法暴露出去
```
//这里给axios实例取别名为axios 
import axios from '@/api/base'

export function getFruits(){
  return axios.get('/getFruits')
}
```
- 使用时，只需要导入请求的方法，进行调用
```
import { getFruits } from '@/api/test'
const list = ref([])
const getFruitsList = async () => {
  try{
    list.value = await getFruits()
  } catch (err){
    list.value = []
  }
}
getFruitsList()
```

>[Axios实例官方文档](https://www.axios-http.cn/docs/instance)

身份验证流程
<img src="https://github.com/hermiablog/shopApp/blob/main/screen/identityAuth.png" style="max-width: 100%;">

拦截器
拦截器分为请求拦截器和响应拦截器
- 请求拦截器：在发送请求之前被调用
- 响应拦截器：在响应被then或catch处理前被调用

>作用
- 在请求拦截器中给请求头添加`Authorization`字段携带认证的Token
- 在响应拦截器中根据响应数据的业务状态码来做相关的处理

>[拦截器官方文档](https://www.axios-http.cn/docs/interceptors)

>请求拦截器
```
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前将token保存到localStorage
    const token=window.localStorage.getItem('token')
    // 如果有token
    if(token){
      config.headers["Authorization"]=token
      }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```

>响应拦截器
```
// 添加响应拦截器
instance.interceptors.response.use(async (response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 身份认证成功，就走这里 返回相应的数据
    const {data:_data}=response;
    const {data,code,msg}=_data;
    // 根据业务状态码来判断要做的事
    if(code===-1){
    await showDialog({
        title:"错误提示",
        message:msg
      })
      return Promise.reject(msg);
    }
    return data
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 如果身份认证失败，就弹出提示框并跳转到登录界面
    if(error.response&&error.response.status===401){
      showDialog({
        title:"请登录",
        message:"没有访问权限，请登录后再试"
      }).then(()=>{
        window.location.href="https//www.baidu.com"
      })
    }
  });
```

### 二、登录注册与短信验证
#### 文件说明
```
shopApp
├─ jsonServer
│  ├─ .env
│  ├─ src
│  │  ├─ controller
│  │  │  ├─ phoneIsExisted.controller.js   //检验电话号码是否已注册
│  │  │  ├─ SmsCodeSend.controller.js    // 用于发送验证码
│  │  │  ├─ SmsCodeCheck.controller.js   // 用于检验用户输入的验证码是否符合要求
│  │  │  └─ userNameIsExisted.controller.js  //检验用户名是否已注册
│  │  ├─ data
│  │  │  ├─ smsCodeData.js  //包含手机号、验证码、过期时间的数据库 
│  │  │  └─ userList.js  //包含用户手机号、用户名、密码等个人信息的数据库
│  │  ├─ routes.js  //路由
│  │  └─ service
│  │     ├─ sendCodeService.js  // 使用阿里云短信服务 发送短信
│  └─ utils
│     └─ randomNum.js  //随机生成n位数字的方法
└─ vue-shop
   ├─ src
   │  ├─ use
   │  │  └─ UseSmsCode.ts
   │  ├─ utils
   │  │  └─ regular.ts
   │  └─ views
   │     └─ register
   │        └─ RegisterIndex.vue
```

#### 思路

||客户端|服务端|
|---|---|---|
|验证手机号|正则校验，发起请求查询手机号是否已注册|根据手机号查询数据库|
|验证用户名|正则校验，发起请求查询用户名是否已注册|根据用户名查询数据库|
|发送验证码|发起请求、进行倒计时|拿到手机号发送短信验证码|
|验证验证码|正则校验，发起请求验证验证码是否正确|根据手机号、验证码查询数据库|
|注册|信息有效、勾选协议，发起请求进行注册|将用户信息添加进数据库，返回不带密码的用户信息数据|

#### 实现注册
组件
- 使用vantUI的Form表单组件，可以根据rule属性进行校验、使用异步函数发起后端请求

验证手机号、用户名
>前端——校验规则配置——rule属性
- required：是否为必选字段，当值为空值时校验不通过
- pattern：使用正则校验输入框内容
- validator：发起异步请求，调用接口

获取验证码
>开通验证码的功能——阿里云平台短信服务功能
- 注册账号
- 完成实名认证
- 进入短信控制台
- 开通短信服务，申请签名、模板等
- 调用API发送短信(SDK版本v1.0、Node.js)
- 申请授权密钥
  - AccessKey管理
  - 开通子账户
  - 获取密钥
  - 添加短信权限

验证验证码
- 用户点击获取验证码，开启倒计时，使用异步函数调用接口

注册
- 输入用户信息及验证码，勾选协议
- 注册成功后，跳转到登录页

#### 实现登录
组件
- 使用vantUI的Form表单组件，可以根据rule属性进行校验、使用异步函数发起后端请求

验证手机号格式：
- 前端校验：利用正则规范输入框内容的格式
  
获取验证码：
- 实现方式和注册时一样

验证验证码
- 实现方式和注册时一样

登录
- 首先根据手机号，在数据库中查找是否已存在；如果没有注册过，就为该手机号创建默认账户
- 注册后/已注册：返回无密码的账户信息和token

用户信息和token的存储
- 效果：使用pinia，作为全局变量存储，同时要保存在localStorage中
- 创建仓库，里面保存了
  - 用户信息：未登录时和登录后的信息
  - 新增数据的方法：根据传入的result更新用户信息，并将用户信息和`token`保存在`localStorage`中
  - 删除用户信息的方法：将用户信息恢复默认值、清空token
- 当登陆成功后，创建仓库实例，使用新增数据的方法将result传入

### 三、我的页面
顶部页面的渲染
- 登录/注册后，接口会返回用户信息
- 使用保存用户信息的仓库，拿到里面的信息进行渲染，使登录前和登录后状态实现变化
- 注意：用户头像在登录前后来源不一样；但图片的地址前缀都是本地服务器
  - 所以要对`/images`进行代理，使登录后的图片地址转到后端服务器；
  - 而未登录时默认头像是在前端，所以不能放在`/images`文件夹里，创建`img`文件夹进行存放

### 四、首页
页面组成
```
HomeIndex
├─ 顶部导航
├─ 定位 —— LocationView
├─ 搜索 —— HomeSearch
│  ├─ 搜索框
│  └─ 搜索页 —— SearchPage
│     ├─ 搜索框
│     └─ 历史记录 —— HistoryView 
├─ 轮播图 —— BannerView
├─ 分类菜单 —— HomeMenu
├─ 特价秒杀 —— PriceKillView
└─ 分类推荐 —— HomeRecommand
```

#### 搜索
在首页点击搜索框跳转到搜索页
- 搜索组件`HomeSearch`同时存在搜索框和弹出层两部分，使用`showPop`变量控制显隐，默认是`false`，弹出层只在它为`true`时显示
- 当搜索框被点击后，`showPop===true`弹出层显示，弹出层由搜索页组件`SearchPage`渲染

搜索页`SearchPage`
- 搜索框输入内容后，拿到关键词向后端发起请求，获取对应内容
- 关闭搜索页：
  - 点击关闭图标时，触发父组件传递的close事件
  - 清空店铺数据
  - 清空输入框的值

组件：历史记录`HistoryView`
- 该组件仅在没有商店数据时显示(即搜索出数据后，不显示历史记录)
- 接收父组件传递的历史记录`historyList`
- 有历史记录时，默认显示最近八条记录，如果有的话，支持展开更多
- 点击删除图标可使用父组件传递的事件，清空`historyList`
- 点击单条历史记录将该值传给父组件`SearchPage`

搜索接口 
- 创建店铺信息的数据库
- 在搜索时使用接口，传入参数，获取数据；接口名：`/api/search?keyword=0&page=1&limit=10`
- 未登录时不能搜索，将搜索接口设置为受保护接口，响应拦截器会进行拦截，并跳转到登录页

搜索框
- 搜索框在输入关键词点击搜索后，
  - 将关键词添加到本地
  - 给接口传入参数，搜索出对应内容

点击历史记录搜索
- 接收子组件传来的值，修改搜索框的值
- 触发onSearch事件

在搜索页渲染店铺
- 使用for循环遍历店铺组件`shopItem`
- 给组件传入搜索后得到的数据

上拉加载更多 —— List 列表

|属性/事件|初始值|功能|
|--|--|--|
|v-model:loading|false|false表示没有在加载数据；true正在更新数据|
|v-model:error|false|true表示数据加载失败，并显示错误提示，用户点击错误提示后会重新触发 load 事件|
|finished|false|true表示数据已全部加载完毕|
|offset|300|滚动条与底部距离小于 offset 时触发 load 事件|
|loading-text|加载中...|加载过程中的提示文案|
|@load事件|-|异步更新数据|

>原理
- 在loading为false的前提下，组件加载的瞬间/组件滚动到底部时，会触发 load 事件，并将loading 设置成 true
- 因此1：在进入搜索页的瞬间会马上加载数据(但是都没搜索哪来的数据)
- 因此2：要使每次搜索时都加载数据，就得定义一个变量`searchState`控制店铺列表的显隐
- 因此3：每一次加载完(无论有无数据)都要使loading为false

>使用
- 将List列表包裹在店铺组件外面
- 在List列表外再加一层控制其显隐

>与搜索方法联调
- 将onSearch方法中用于获取数据的异步方法剪切到onLoad方法中
- 上拉加载更多：
  - 使每次获取数据的`page++`，直到数据长度大于`total`，就将`finished`设为`true`，表示数据已全部加载完毕
  - 在每次搜索前将`page=0`，将`shopList`清空，将`finished`设为`false`
- 在`onSearch`方法中使用两个定时器控制店铺列表的显隐，在点击搜索的0毫秒将`searchState=false`隐藏，100毫秒时将`searchState=true`显示店铺，触发`onLoad`事件

>注意事项
- 不能在点击搜索后清空输入框的值，这将导致`onLoad`事件拿不到搜索的内容
- 不能为了进入搜索页时不加载数据 而给`List`列表设置`immediate-check`属性，这将导致无法触发onload事件，使用变量控制显隐一举两得

下拉刷新——List 组件与 PullRefresh 组件结合使用
- `refreshing`默认值为false，true表示正在加载中，
- 下拉后就会触发`refresh`事件，并将`refreshing=true`
- 在`refresh`事件中
  - 将数据更新为最新一条
  - 将`loading`设为true，表示正在加载中，会有加载中的文字
  - 将`finished = false，page.value = 0`表示开始新一轮搜索

#### 店铺组件`shopItem`
数据的渲染
- 根据父传入的数据渲染

难点
- 字体大小为10px，而浏览器最小字号为12px
- 解决办法：使用`scale`缩放到`0.85`倍 
- 产生的问题：会产生无法更改的外边距

#### 轮播图
前端
- 引入接口
- 创建`BannerView`文件，调用接口，渲染页面
  
#### 分类菜单
前端
- 引入接口
- 创建`HomeMenu`文件，调用接口，获取数据
- 使用网格布局渲染

#### 特价秒杀
前端
>倒计时组件 —— CountDown
- 注意：要进行补0操作，使用`String.prototype.padStart()`方法
- 因为不显示天数，所以需要`时`的值需要再加上`天数*24`
- 当倒计时为0时，会自动调用finish事件；定义一个变控制特价秒杀板块的显隐，在finish事件中改变变量的值将该板块下架

>轮播图组件 —— Swipe 轮播
- 使用`RouterLink`包裹单个滑块，路由的参数根据每个商品的数据传入
- 难点：轮播图组件中单个滑块的宽度不能自适应，只能使用px单位
  - 单独写一个方法，将`px`转换成`vw` 
  - 在生命周期钩子函数中，使用`window.resize()`事件调用该方法；并在组件销毁时清理

#### 首页分类推荐
前端
- `HomeRecommand`组件由两部分组成
  - 头部的分类标签和每个标签对应的推荐内容——组件`RecommendItem`
- 怎样实现分类推荐
  - 使用动态组件，将推荐内容的组件名作为参数传入
- 怎样获取不同类型的数据
  - 给动态组件传入类型值：`category`
- 实现下拉刷新和上拉加载更多
  - 注意：下拉刷新时必须给`RecommendItem`根组件添加`overflow-auto`和高度；
  - 不能加在`HomeRecommand`组件里，否则会导致初次渲染时获取两次数据
- 在组件`RecommendItem`中使用接口获取数据
  - 写一个方法获取数据，使用for循环遍历店铺组件`shopItem`
  - 由于上拉加载会在页面初次渲染时自动调用一次；所以在`onLoad`中调用获取数据的方法

### 五、店铺详情 
商家详情页构成
```
shopIndex
├─ 顶部店铺信息 —— shopTop
├─ tab标签栏
│  ├─ 全部商品
│  │  └─ 菜单 —— AllGoods
│  │     └─ 异步组件 —— AsyncGoodsList
│  │        └─ 单个商品 —— GoodsItem
│  ├─ 评价 —— shopEvaluate
│  └─ 商家 —— shopKeeper
└─ 购物车 —— CartItem
   ├─ 购物车列表 
   │  └─ 单个商品 —— CartGoodsItem
   └─ 结算栏 —— CartSettlement
```
#### 顶部的店铺信息 —— `shopTop`组件
>swiper轮播图组件
- 设置滑块间的间隔且最后一个滑块完整显示的方法：在`.van-swipe-item`中
  - 将单个滑块设置为怪异盒模型
  - 将间隔设置为内边距
  - 传入的单个滑块宽度为内容宽+padding

>展开和收缩
- 方法1：使用`useToggle`函数
  - 当value为false时，显示下箭头图标，并且对数据长度进行限制
  - 当value为true时，显示上箭头图标，不限制对数据长度
- 方法2：对于文字，可以使用`van-text-ellipsis`组件

#### tab标签栏
- 利用动态组件实现不同面板的切换

店铺菜单
- 使用`IndexBar`索引栏组件布局
- 索引字符作为左侧菜单，`van-index-bar`作为右侧的对应内容
- 实现分类和点击左侧菜单即可调到对应内容

>实现布局
- 页面分为左右两部分，先把该组件放到右侧的`goods-list`盒子
- 要把索引放到左侧盒子`goods-menu`，则必须使用`teleport`属性指定索引栏挂载的节点`#menu`，然后调整样式
- 实现的前提是左侧盒子要比`IndexBar`索引栏组件更早挂载到页面；然而它们是同一父组件，所以这是实现不了的
- 因此要将`IndexBar`索引栏组件单独放入一个组件，并使用`defineAsyncComponent`异步调用

>左侧菜单实现吸顶盒效果
- 使用Sticky 粘性布局组件，设置`:offset-top`
- 将该组件包裹在`scroll-wrapper`外面

>左侧菜单实现滚动
- 安装并引入滚动插件 —— `better-scroll`
```
npm i better-scroll

import BScroll from '@better-scroll/core'
```
- 在节点`#menu`外面再包裹一个节点`scroll-wrapper`
- 注意：调用时，子元素必须有内容
  - 因此设置侦听器：并且为了确保能接收数据，设置定时器，等索引列表`indexList`接收完成后再触发
- 注意：子元素的高度必须超过`scroll-wrapper`的高度，因此需要计算它的高度：`屏幕高度-tab栏-购物车`
- 该插件会默认将索引的点击跳转效果关闭，因此必须手动配置
```
watch(
  indexList,
  (value) => {
    if (value.length > 0) {
      setTimeout(() => {
        new BScroll('.scroll-wrapper', {
          click: true
        })
      }, 100)
    }
  },
  {
    immediate: true
  }
)
```
>注意各部分的z-index
- `App`页面的底部`tabBar` —— 2
- `ShopIndex`页面和`HomeIndex`页面的分类`tabBar` —— `99`
- `ShopIndex`页面的底部购物车 —— 100
- 页面顶部的`topBar`导航 —— 1

>数据渲染
- 在异步组件`AsyncGoodsList`中使用接口`/api/shop/goods?shopId`接收数据，渲染页面
- 右侧使用for循环商品组件`GoodsItem`来实现商品列表
- 将`shopId`和商品数据传递给`GoodsItem`

>实现点击商品跳转到详情页
- 使用vue Router编程式导航来实现
- 给`GoodsItem`的根组件，绑定点击的方法
- 当商品被点击时就传入`shopId`和`goodsId`，使用`push`方法来导航到`name=goods`的路由，即商品详情页

>注意区分：
- `useRouter`函数访问到 router 实例，可以实现路由间的跳转等
- `useRoute`函数访问到当前路由，可以获取当前路由携带的参数

#### 购物车 —— `CartItem`组件
>该组件由购物车内容和结算面板组成
- 购物车内容使用Popup 弹出层实现，点击结算面板时就会从底部弹出
  - 其中包含的商品列表使用`CartGoodsItem`组件，进行for循环实现
  - `CartGoodsItem`组件和`GoodsItem`类似，但不同之处不方便复用，因此拆分成两个
- 结算面板由`CartSettlement`组件实现

>UseCartStore仓库
- 使用Map来保存购物车的数据，实现店铺和店铺购物车数据的一一对应
```
//数据结构
new Map([
   // [shopId,shopInfos],
    [1,{
        shopName:'xxx',
        goodList:[
             {
                goodsId:'10001'
                name: 'B级-进口香蕉2根/300-350g'|商品名称
                imgUrl: '/images/goods/type1-01.jpg', // 商品图片
                cartCount: 1, // 购物车数量
                checked: false,  // 添加购物车按扭选中
                // ...更多字段
            },
        ]
    }]
])
```
- 将购物车数据保存到本地存储：使用`useLocalStorage`实现响应式

|方法|作用|参数|
|--|--|--|
|`cartList`|所有购物车信息|-|
|`pushProductToCart`|添加购物数量（+1）|`shopId`、`shopName`、`goods`|
|`reduceProductFromCart`|减少购物数量（-1）|`shopId`、`goodsId`|
|`getGoodsCartCount`|获取某个店铺的某件商品的加购数量|`shopId`、`goodsId`|
|`getShopCartInfo`|返回对应店铺的购物车列表信息|`shopId`|`CartGoodsItem`组件|
|`toggleSelect`|动态切换单选|`shopId`、`goodsId`|
|`isAllSelect`|判断是否全选|`shopId`|
|`setAllSelect`|设置全选|`shopId`|
|`cancleAllSelect`|取消全选|`shopId`|
|`toggleAllSelect`|动态切换全选状态|`shopId`|
|`cartGoodsNum`|计算店铺加购的商品数量|`shopId`|
|`selectGoodsNum`|计算购物车内选中的商品数量|`shopId`|
|`TotalPrice`|计算总价格|`shopId`|
|`clearCart`|清空购物车|`shopId`|
|`selectToPayGoods`|获取单个店铺已选中的商品信息，用于结算|`shopId`|
|`getCartList`|返回购物车列表数据|-|
|`getAllCartPrice`|计算所有店铺中选中商品的总价格|-|
|`getAllCheckedGoodsList`|获取所有店铺以及被选中的商品 `map`结构|-|
|`clearAllCheckedFromCart`|删除购物车中已支付/取消支付的商品|-|
|`deleteCartGoods`|删除购物车中的商品|`shopId`、`goodsId`|

>逻辑处理
- 加入购物车`pushProducetToCart`
  - 传入对应的shopId、shopName、goods(商品信息)
  - 先根据shopId判断，如果没有该店铺数据就新增一条
  - 再根据goodsId判断，如果没有就在对应店铺的goodList里添加一条数据；如果有就更新数量和选中状态
- 减少商品数量`removeProductFromCart`
  - 传入对应的shopId、goodsId
  - 先根据shopId找到该店铺对应的购物车数据
  - 再根据goodsId判断，如果有将该商品加购数量-1；如果-1之后是0，那就把该商品数据删除；如果删除后goodList没有数据了，就把店铺信息删除

>数量组件的数据获取
- 店铺商品菜单栏
  - `shopName`：`AsyncGoodsList`-->`GoodsItem`-->`ToCart`
  - `shopId`和`Goods`：`GoodsItem`-->`ToCart`
- 购物车结算
  - 都是由`CartItem`根据路由参数获取，传递给`CartGoodsItem`-->`ToCart`
  - `shopName`：`CartItem`根据路由参数获取
  - `shopId`和`Goods`：`CartItem`使用仓库的`getShopCartInfo`方法获取
  - 购物车中的商品列表也是使用`getShopCartInfo`方法获取的数据进行渲染
- 数量组件中的数量：使用仓库的`getGoodsCartInfo`方法获取；
- 注意使用上面两个方法时要用计算属性实现响应

>购物车价格、数量的获取
- 使用仓库中定义的方法，实现对应数据的渲染

>优化购物车样式
- 没有添加商品时，底部结算面板为灰色，不能点击弹出购物车列表，不能跳转到结算页面，没有徽标

### 六、收货地址
#### 提交结算后的流程
<img src="https://github.com/hermiablog/shopApp/blob/main/screen/process-enterShop.png" style="max-width: 100%;">

确认订单页
>分成三个组件实现：收货信息、商品列表、底部结算
- 由于商品列表和底部结算组件都需要复用，所以数据都由父组件传入
>收货信息的渲染：
- 先看是否有`addressId`，如果有就代表是刚选择完回到该页面
- 再找默认地址
- 如果都没有就显示选择地址的样式

选择收货地址页
- 可进行选择、修改、删除、添加地址的操作
>页面跳转
- 如果是编辑地址，则需要携带`addressId`跳转
- 如果是新增地址，则不需要参数
- 如果是选择地址，则需要带着`shopId`和`addressId`跳转到确认订单页

>注意：处理选择地址后的后退
- 选择地址后会直接跳转到确认订单页，此时如果点击顶部导航的后退键，则会返回到选择地址页；逻辑上应该回到店铺
- 路径：店铺-->不带`addressId`的确认订单-->选择地址-->带`addressId`的确认订单页
- 不做任何处理时，在带`addressId`确认订单点击返回-->选择地址-->不带`addressId`确认订单-->店铺
>处理方法
- 首先：选择地址后的跳转到确认订单页的方法，用`replace`代替`push`方法；它与 push 方法一样用来导航到一个新的 URL，但会替换掉之前的 URL，无法后退到之前 URL
- 做完这步之后，路径变成：在带`addressId`确认订单点击返回-->不带`addressId`确认订单-->店铺
- 因此需要设置定时器，在跳转到确认订单页前，使用`history.back()`回到不带`addressId`的确认订单页，然后定时结束使用`replace`方法跳转到确认订单页；这样就可以直接返回店铺

地址编辑页和新增地址页
- 这两个页面是同一组件和同一套样式，只是根据传入的参数不同，数据的渲染是不同的
>页面布局
- 内容使用Form表单组件渲染，其中地区选择部分，使用`van-area`组件实现
- 在表单中使用 Area 组件时的属性或方法
```
// 省市区数据的类型
interface IArearList {
  text: string
  value: string
  children: IArearList[]
}
const result = ref() //显示选择后的省市区数据
const showArea = ref(false) //弹窗显隐
const areaCode = ref('110101') //选择器的默认初始的地区
const onConfirm = ({ selectedOptions }: { selectedOptions: IArearList[] }) => {
  showArea.value = false
  result.value = selectedOptions.map((item) => item.text).join('/')
}
<van-field
  v-model="result"
  is-link
  readonly
  name="area"
  label="地区选择"
  placeholder="点击选择省市区"
  @click="showArea = true"
/>
<van-popup v-model:show="showArea" position="bottom">
  <van-area
    :area-list="areaList"
    v-model="areaCode"
    @confirm="onConfirm"
    @cancel="showArea = false"
  />
</van-popup>
```

>遇到的问题：在引入`area-data`时，报错：“找不到 @vant/area-data”或其相应的类型声明”
- 解决办法：将`node_modules`下存放省市区数据的`index.esm.mjs`和类型声明文档`index.d.ts`复制到`src/assets`中，接着更改引入地址即可

>数据渲染
- 如果路由携带了`addressId`参数，则根据它获取地址数据，渲染在页面
- 如果没有，则什么都不需要渲染

### 七、购物车和订单页
#### 购物车页面布局
```
shopIndex
├─ 顶部导航 
├─ 购物车列表 —— CartList
│  └─ 单个商品 —— CartGoodsItem
├─ 底部结算 —— CartSettlement
└─ 确认订单 —— CartOrderComfirmation
```
>购物车列表
- 使用`SwipeCell`滑动单元格，实现商品的左右滑动效果
- 删除按钮的点击事件，使用`cartStore`的`deleteCartGoods`方法实现删除

>空页面
- 使用`isNull`组件

#### 购物车数据
>购物车列表：
- 在`cartStore`里定义一个方法`getCartList`，返回购物车数据`cartList`

>确认订单页数据
- 复制在店铺结算时的确认订单页，加以修改，二者的购物车数据不同
- 从底部tab进入购物车进行结算时，需要获取的是购物车中所有店铺被选中的商品，而不是单个店铺
- 在`cartStore`中定义方法`getAllCheckedGoodsList`，用来获取所有店铺以及被选中的商品，返回的数据为map结构

#### 确认支付
>功能
- 点击确认支付后，需要完成：模拟支付、生成订单、删除购物车中已结算商品、跳转到订单页
- 第一步：根据点击确认支付或取消支付，会生成不同的订单状态：已完成/已取消
- 第二步：调用接口`/generate/order`，传入订单信息，生成订单数据
- 第三步：使用`cartStore`中的方法，将提交支付的商品从购物车中删除
- 第四步：跳转到订单页

>实现
- 定义一个字段`orderList`，保存订单数据，在调用生成订单的接口时传入，包括：
  - 继承购物车数据：`shopName`、`goodsList`
  - 新增：`userId`、`orderId`、`shopId`、`addressId`、`isCanceled`(表示订单状态)

#### 订单页
>数据
- 调用接口`/order/list`，获取所有订单
>空页面
- 使用`isNull`组件

### 八、商品详情页
#### 布局中需要注意
>加入购物车按钮与数量组件
- 根据`shopId`和`goodsId`获取当前商品的加购数量；如果数量为0，则显示加入购物车按钮
- 点击加入购物车，就调用`pushProductToCart`方法将当前商品加入购物车数据

#### 商品数据
>需要什么
- 商品详情的渲染需要`goods`数据
- 使用数量组件、获取当前商品的加购数量、加入购物车等都需要`shopId`和`shopName`


### 九、关联用户
一般情况下，在项目初始搭建的时候就应该考虑到这一点
>购物车关联用户
- 拿到`useInfo`状态管理库中的`userId`
- 将本地存储中保存用户的购物车数据的字段与用户ID关联
- 创建侦听器，一旦用户id变化，LocalStorage就会重新创建字段保存该用户的购物车数据

>订单关联用户
- 在生成订单时，将userId加入订单数据，发送到后端
- 前端在调用获取订单的接口时，需要将用户id传入
- 获取订单的接口，要根据请求体中携带的用户id，对订单数据进行筛选，返回当前用户的订单数据

>收货地址关联用户
- 在调用接口时传入`userId`
- 修改获取/删除/编辑/新增用户地址的接口，使用userId对数据进行筛选

