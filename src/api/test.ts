import axios from '@/api/base'
import type { FruitList,IUserInfo,ILogin } from '@/types/test'
export function getFruits(){
  return axios.get<FruitList,FruitList>('/getFruits')
}
export function getLogin({username,password}:IUserInfo){
  return axios.post<ILogin,ILogin>('/login',{
    username,
    password
  })
}