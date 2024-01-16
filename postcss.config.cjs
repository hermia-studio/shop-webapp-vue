module.exports = {
  autoprefixer: {},
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      // 设计稿的视口宽度
      viewportWidth: 375,
      // 忽略某些文件夹下的文件或特定文件, 忽略node_modules 下的文件
      exclude: [/node_modules/],
      // 	需要转换的单位，默认为 px
      unitToConvert: 'px',
      // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
      minPixelValue: 1
      /*
          如果传入的值为字符串的话，只要选择器中含有传入值就会被匹配
          例如 selectorBlackList 为 ['body'] 的话， 那么 .body-class 就会被忽略
          如果传入的值为正则表达式的话，那么就会依据 CSS 选择器是否匹配该正则
          例如 selectorBlackList 为 [/^body$/] , 那么 body 会被忽略，而 .body 不会
          */
      // selectorBlackList: [/^body$/]   // 不需要转换的css选择器
    }
  }
}
