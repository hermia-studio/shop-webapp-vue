<template>
  <div class="detailPage">
    <div class="detail">
      <div class="title">商品</div>
      <div class="detailText">
        <span>规格</span>
        <span>100-200g/个</span>
      </div>
      <div class="detailText">
        <span>产地</span>
        <span>中国</span>
      </div>
      <div class="detailText">
        <span>商品类别</span>
        <span>水果</span>
      </div>
    </div>
    <img src="@/assets/img/home/pho_details_2.png" alt="" />
  </div>
</template>
<style scoped lang="scss">
.detailPage {
  width: 100%;
  background-color: #fff;
  padding: 16px;
  .detail {
    .title {
      height: 20px;
      font-size: 14px;
      color: #051733;
      line-height: 20px;
      margin-bottom: 8px;
    }
    .detailText {
      margin-bottom: 8px;
      height: 17px;
      font-size: 12px;
      color: #4f5c70;
      line-height: 17px;
      span {
        margin-right: 12px;
      }
    }
  }
  img {
    width: 343px;
    height: 170px;
  }
}
</style>
