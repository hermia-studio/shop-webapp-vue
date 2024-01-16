import axios from "@/api/base";
export function auth(){
    return axios.post<boolean,boolean>('/auth')
}