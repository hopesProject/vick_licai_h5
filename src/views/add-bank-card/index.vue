<template>
  <div class="wrapper">
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <div>完成资料添加银行卡</div>
      <img src="@/assets/add-bank-bg.png" alt="">
    </div>
    <div class="box">
      <van-cell-group class="form-field">
        <van-field v-model="form.xm" label="姓名" placeholder="请输入姓名" label-width="80" />
        <van-field v-model="form.sjh" label="手机号" placeholder="请输入手机号" label-width="80" />
        <van-field v-model="form.yhmc" label="银行名称" placeholder="请在这里输入......" label-width="80" />
        <van-field v-model="form.yhkh" label="银行卡号" placeholder="请在这里输入......" label-width="80" />
        <van-field v-model="form.gjjrfwzx" label="国际金融服务中心" placeholder="请输入输入......" label-width="150" />
      </van-cell-group>
      <div class="submit-button">
        <van-button type="primary" block color="linear-gradient(0deg,#ff947c 0%, #ffb98c 100%), #00a8ff" :round="true"
          @click="popupShow = true">提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        xm: '',
        sjh: '',
        yhmc: '',
        yhkh: '',
        gjjrfwzx: '',
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  .van-icon {
    padding: 34px 0 0 34px;
  }

  background-color: #EBF9FC;

  >div {
    color: #999999;
    font-weight: 500;
    text-align: center;
    font-size: 36px;
  }
}

.box {
  flex: 1;
  background: linear-gradient(to bottom, #ffffff, #F9D9D2);

}

.form-field {
  background-color: transparent;

  .van-cell {
    height: 150px;
    font-size: 36px;
    display: flex;
    align-items: center;
    background-color: transparent;

    :deep(.van-field__label) {
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 500;
      color: #333333;
    }
  }
}

.submit-button {
  padding: 26px 80px;

  .van-button {
    height: 80px;
    font-size: 32px;
  }
}
</style>