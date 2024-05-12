<template>
  <div class="wrapper">
    <come-back :title="$t('注册')" />

    <div class="box">
      <div class="header">Welcome !</div>

      <van-cell-group>
        <van-field
          v-model="form.phone"
          :placeholder="$t('+91 手机号')"
          input-align="left"
        />
        <van-field
          v-model="form.code"
          :placeholder="$t('验证码')"
          input-align="left"
        />
        <van-field
          v-model="form.pwd"
          type="password"
          :placeholder="$t('密码')"
          input-align="left"
        />
        <van-field
          v-model="form.passwordNew"
          type="password"
          :placeholder="$t('确认密码')"
          input-align="left"
        />
        <van-field
          v-model="form.inviteCode"
          :placeholder="$t('邀请码')"
          input-align="left"
        />
      </van-cell-group>
      <div class="register">
        <div @click="$router.push('/login')">{{ $t("已有账号，去登录") }}</div>
        <div @click="$router.push('/password')">{{ $t("忘记密码?") }}</div>
      </div>
      <div class="login-button">
        <van-button
          type="primary"
          block
          @click="registerApi"
          color="linear-gradient(270deg,#FF947C 0%, #FFB98C 100%), #c5924f"
          :round="true"
          >{{ $t("注册") }}</van-button
        >
        <div class="download" @click="$router.push('/download')">
          {{ $t("下载APP") }}
        </div>
        <img src="@/assets/login-icon.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { register } from "@/api";
import { Toast } from "vant";

export default {
  data() {
    return {
      form: {
        phone: "", //手机号码
        code: "", //验证码
        pwd: "", //密码
        passwordNew: "", //确认密码
        inviteCode: "", //邀请码
      },
    };
  },
  methods: {
    async registerApi() {
      if (this.form.phone === "") {
        Toast(this.$t("手机号码不能为空"));
        return false;
      }

      if (this.form.code === "") {
        Toast(this.$t("验证码不能为空"));
        return false;
      }

      if (this.form.pwd === "") {
        Toast(this.$t("密码不能为空"));
        return false;
      }

      if (this.form.passwordNew === "") {
        Toast(this.$t("确认密码不能为空"));

        return false;
      }

      if (this.form.pwd !== this.form.passwordNew) {
        Toast(this.$t("密码和确认密码不一致"));
        return false;
      }

      const res = await register(this.form);
      if (res.code === 0) {
      }
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
  height: 80%;

  .header {
    padding-bottom: 30px;
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
      text-decoration: underline;
    }

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