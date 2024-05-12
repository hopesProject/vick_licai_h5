<template>
  <div class="wrapper">
    <div class="title">忘记密码</div>
    <div class="box">
      <!-- <van-cell-group class="form-field">
        <van-field v-model="form.xm" label="姓名" placeholder="请输入姓名" label-width="80" />
        <van-field v-model="form.sjh" label="手机号" placeholder="请输入手机号" label-width="80" />
        <van-field v-model="form.yhmc" label="银行名称" placeholder="请在这里输入......" label-width="80" />
        <van-field v-model="form.yhkh" label="银行卡号" placeholder="请在这里输入......" label-width="80" />
        <van-field v-model="form.gjjrfwzx" label="国际金融服务中心" placeholder="请输入输入......" label-width="150" />
      </van-cell-group> -->
      <div class="form-input">
        <img src="@/assets/user-icon.png" alt="">
        <div class="form-txt">+91</div>
        <input type="text" v-model="form.sjh">
      </div>
      <div class="form-input">
        <img src="@/assets/password-icon1.png" alt="">
        <input type="text" v-model="form.yzm">
        <div class="verification">获取验证码</div>
      </div>
      <div class="form-input">
        <img src="@/assets/password-icon.png" alt="">
        <input type="text" v-model="form.mm">
      </div>
      <div class="form-input">
        <img src="@/assets/password-icon.png" alt="">
        <input type="text" v-model="form.qrmm">
      </div>
      <div class="submit-button">
        <van-button type="primary" block color="linear-gradient(0deg,#ff947c 0%, #ffb98c 100%), #00a8ff"
          :round="true">找回</van-button>
        <van-button type="danger" plain block :round="true" @click="$router.push('/login')">已有账号，点击登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        sjh: '',
        yzm: '',
        mm: '',
        qrmm: '',
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/password-bg.png");
  background-size: 100%;
  padding: 0 30px;
}

.title {
  color: #ffffff;
  font-size: 37px;
  text-align: center;
  padding: 50px 0;
}

.box {
  background: #ffffff;
  border-radius: 26px;
  padding: 70px 50px;
}

.form-input {
  height: 96px;
  width: 100%;
  border: 2px solid #cccccc;
  border-radius: 48px;
  display: flex;
  align-items: center;
  padding: 0 30px 0 40px;
  margin-bottom: 40px;

  .form-txt {
    width: 118px;
    height: 53px;
    line-height: 53px;
    font-size: 31px;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%), #498de4;
    border-radius: 22px;
    margin-left: 20px;
  }

  .verification {
    color: #999999;
    font-size: 31px;
    white-space: nowrap;
    text-decoration: underline;
  }

  >img {
    width: 36px;
    height: 36px;
  }

  >input {
    width: inherit;
    padding-left: 20px;
    border-radius: 48px;
  }
}

.submit-button {
  padding: 26px 0px;

  .van-button {
    height: 80px;
    font-size: 32px;
    margin-bottom: 40px;
  }
}
</style>