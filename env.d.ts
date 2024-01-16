/// <reference types="vite/client" />
// 解决找不到模块“./App.vue”或其相应的类型声明
declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
// 解决router引入报错的问题
// declare module '*./router' {
//     import type { DefineComponent } from 'vue-router'
//     const component: DefineComponent<{}, {}, any>
//     export default component
//   }
  