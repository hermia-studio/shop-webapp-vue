import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "normalize.css" //用来处理不同浏览器的兼容
import "./assets/css/common.css"
import "./assets/css/iconfont.css"
import App from './App.vue'
import router from './router'
// vant组件样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
