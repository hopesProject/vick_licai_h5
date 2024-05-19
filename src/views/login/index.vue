<template>
  <div class="wrapper fanhui">
    <van-nav-bar
      :title="$t('登录')"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <svg-icon iconClass="lang" style="font-size: 20px"></svg-icon>
      </template>
    </van-nav-bar>

    <div class="box">
      <div class="header">Welcome !</div>
      <van-tabs class="box-tabs" v-model="activeName">
        <van-tab title="手机号码" name="a"></van-tab>
        <van-tab title="账户" name="b"></van-tab>
      </van-tabs>
      <van-cell-group>
        <div class="border-box-flex border-box" v-if="activeName == 'a'">
          <div class="border-quhao">+91</div>
          <van-field
            v-model="form.phone"
            placeholder="输入账号手机号"
            input-align="left"
          />
        </div>
        <div class="border-box-flex border-box" v-if="activeName == 'b'">
          <van-field
            v-model="form.phone"
            placeholder="请输入用户名"
            input-align="left"
          />
        </div>
        <PasswordInput
          :placeholder="$t('请输入密码')"
          name="password"
          @change="iniput"
        />
      </van-cell-group>
      <div class="logon">
        <van-button
          @click="login"
          :loading="loading"
          type="primary"
          block
          color="linear-gradient(270deg,#FF947C 0%, #FFB98C 100%), #c5924f"
          :round="true"
          >登录</van-button
        >
      </div>
      <div class="register">
        <div @click="$router.push('/register')">注册</div>
        <div @click="$router.push('/password')">忘记密码</div>
      </div>
      <div class="login-button">
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
import PasswordInput from "@/components/PasswordInput/index.vue";

export default {
  components: { PasswordInput },
  watch: {
    activeName() {
      this.form = {
        phone: "",
        password: "",
      };
    },
  },
  data() {
    return {
      loading: false,
      activeName: "a",
      form: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/lang");
    },
    ...mapActions(["getLogin"]),
    iniput(e, name) {
      this.form[name] = e;
    },
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
          Toast.success(this.$t("登录成功"));
          setTimeout(() => {
            this.$router.push("/");
          }, 1500);
        }
      } catch (error) {
        this.loading = false;
      }
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/login-bg.png");
  background-size: 100% 100%;
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
    padding-bottom: 70px;
    font-weight: bold;
  }

  .van-cell-group {
    background-color: transparent;

    .van-cell {
      line-height: 80px;
      background-color: transparent;
      font-size: 36px;
      //border-bottom: 4px solid #fff;
      // margin-bottom: 16px;
    }
  }

  .register {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

    > div:nth-child(1) {
      font-size: 24px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: normal;
      text-decoration: underline;
      text-align: left;
      color: #666666;
      line-height: 50px;
      letter-spacing: 1.2px;
    }

    > div:nth-child(2) {
      font-size: 24px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: 400;
      text-align: left;
      color: #00d1cb;
      line-height: 50px;
      letter-spacing: 1.2px;
    }
  }

  .login-button {
    display: flex;
    flex-direction: column;
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
      color: #fff;
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

.border-box {
  border-bottom: 4px solid #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .border-quhao {
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
}
.logon {
  // width: 50%;
  margin: 50px auto 0;
}
.box-tabs {
  padding: 0 40px;
  margin-bottom: 30px;
  :deep(.van-tabs__nav) {
    background-color: transparent;
  }
  :deep(.van-tabs__wrap) {
    background-color: transparent;
    border-radius: 40px;
    height: 60px;
    box-shadow: -10px 0px 17px 1.5px rgba(20, 7, 0, 0.1);

    .van-tab {
      font-size: 30px;
      color: #999999;

      .van-tab__text {
        height: 80px;
        line-height: 80px;
      }
    }

    .van-tab--active {
      margin: 4px;
      background: linear-gradient(0deg, #ff957c 0%, #ffba8b 100%), #ffffff;
      border-radius: 40px;
      color: #ffffff;
    }
    .van-tabs__line {
      background-color: transparent;
    }
  }
}
:deep(.van-nav-bar) {
  background-color: transparent;
  .van-nav-bar__content .van-nav-bar__title {
    // color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
::v-deep .van-hairline--bottom::after {
  border: none;
}
</style>