import axios from 'axios'
import { showDialog } from 'vant';
import 'vant/es/dialog/style';
import router from "../router/index"
const instance = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前将token保存到请求体
    const token=window.localStorage.getItem('token')
    // 如果有token
    if(token){
      config.headers["token"]=token
      }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

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
    // 身份认证失败
    if(error.response&&error.response.status===401){
      showDialog({
        title:"请登录",
        message:"没有访问权限，请登录后再试"
      }).then(()=>{
        // 如果身份认证失败，就弹出提示框并跳转到登录界面
        router.push('/login')
      })

    }
  });


export default instance