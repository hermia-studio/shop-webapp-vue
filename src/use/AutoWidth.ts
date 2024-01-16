import {ref,onMounted,onUnmounted} from 'vue'
/**
 * 根据传入的单位为px的宽度 计算出vw单位的宽度
 * px 传入的宽度
 */
export function AutoWidth(px:number){
    const _px=ref(px)
    const converFn=()=>{
    // 91 px单位 等于多少vw  1vw=3.75px
    const _vw = (px/ 3.75)
    // 屏幕宽度
    const width = ref(document.documentElement.clientWidth)
    _px.value=(width.value / 100) * _vw
    }
    converFn()

    onMounted(()=>{
        window.onresize=converFn
    })
    onUnmounted(()=>{
        window.onresize=null
    })
    // 注意返回的是ref
    return _px
}
