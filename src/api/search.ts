import axios from "./base"
import type {ISearchShopListData} from "@/types/search"

export function searchShopList(keyword:string,page?:number,limit?:number){
    return axios.get<ISearchShopListData,ISearchShopListData>('/search',{
        params:{
            keyword,
            page,
            limit
        }
    })
}