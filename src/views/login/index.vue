<template>
  <div class="wrapper">
    <come-back />
    <div class="box">
      <div class="header">Welcome !</div>
      <van-cell-group>
        <van-field
          v-model="form.phone"
          placeholder="+91 输入账号手机号"
          input-align="left"
        />
        <van-field
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          input-align="left"
        />
      </van-cell-group>
      <div class="register">
        <div @click="$router.push('/register')">注册</div>
        <div @click="$router.push('/password')">忘记密码</div>
      </div>
      <div class="login-button">
        <van-button
          @click="login"
          :loading="loading"
          type="primary"
          block
          color="linear-gradient(270deg,#FF947C 0%, #FFB98C 100%), #c5924f"
          :round="true"
          >登录</van-button
        >
        <div class="download" @click="$router.push('/download')">下载APP</div>
        <img src="@/assets/login-icon.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api";
import { Toast } from "vant";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      form: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["getLogin"]),
    async login() {
      if (!this.form.phone) {
        return Toast.fail(this.$t("请输入手机号码"));
      }
      if (!this.form.password) {
        return Toast.fail(this.$t("请输入密码"));
      }
      this.loading = true;
      try {
        const res = await login(this.form);
        if (res.status == 0) {
          this.getLogin(res.data);
          this.$router.push("/");
          this.loading = false;
        }
      } catch (error) {
        console.log(3333);
        this.loading = false;
      }
      console.log(555);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/login-bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
}

.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 60%;

  .header {
    padding-bottom: 100px;
    font-weight: bold;
  }

  .van-cell-group {
    background-color: transparent;

    .van-cell {
      line-height: 80px;
      background-color: transparent;
      font-size: 36px;
      border-bottom: 4px solid #fff;
      margin-bottom: 16px;
    }
  }

  .register {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

    > div:nth-child(1) {
      font-size: 24px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      text-decoration: underline;
      text-align: left;
      color: #666666;
      line-height: 50px;
      letter-spacing: 1.2px;
    }

    > div:nth-child(2) {
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;
      color: #00d1cb;
      line-height: 50px;
      letter-spacing: 1.2px;
    }
  }

  .login-button {
    margin-top: 50px;
    width: 50%;
    position: relative;

    .van-button {
      height: 86px;
      line-height: 86px;
      font-size: 36px;
    }

    .download {
      background: linear-gradient(to right, #ff947c, #ffb98c);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-size: 24px;
      font-weight: 400;
      margin-top: 20px;
      text-align: center;
    }

    > img {
      position: absolute;
      left: 100%;
      top: 50%;
    }
  }
}
</style>