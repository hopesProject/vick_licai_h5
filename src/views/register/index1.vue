<template>
  <div class="wrapper">
    <van-nav-bar
      :title="$t('注册')"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div class="box">
      <div class="header">Welcome !</div>

      <van-cell-group>
        <van-field
          class="border-box"
          v-model="form.userName"
          :placeholder="$t('用户名')"
          input-align="left"
        />
        <div class="border-box-flex border-box">
          <div class="border-quhao">
            +91 <img src="@/assets/image_2024-05-16_19-57-54.png" alt="" />
          </div>
          <van-field
            v-model="form.phone"
            placeholder="手机号"
            input-align="left"
          />
        </div>

        <div class="flex border-box">
          <van-field
            v-model="form.code"
            :placeholder="$t('验证码')"
            input-align="left"
            center
            clearable
          >
            <template #button>
              <van-button
                :disabled="codeButTexst !== '发送验证码'"
                @click="sendCode"
                type="primary"
                size="small"
              >
                {{ $t(codeButTexst) }}</van-button
              >
            </template>
          </van-field>
        </div>
        <PasswordInput :placeholder="$t('密码')" name="pwd" @change="iniput" />
        <PasswordInput
          :placeholder="$t('确认密码')"
          name="passwordNew"
          @change="iniput"
        />

        <van-field
          class="border-box"
          v-model="form.inviteCode"
          :disabled="isinviteCode"
          :placeholder="$t('邀请码')"
          input-align="left"
        />
      </van-cell-group>
      <div class="logon">
        <van-button
          type="primary"
          block
          @click="registerApi"
          color="linear-gradient(270deg,#FF947C 0%, #FFB98C 100%), #c5924f"
          :round="true"
          >{{ $t("注册") }}</van-button
        >
      </div>
      <div class="register">
        <div @click="$router.push('/login')">{{ $t("已有账号，去登录") }}</div>
        <div @click="$router.push('/password')">{{ $t("忘记密码?") }}</div>
      </div>
      <div class="login-button">
        <div class="download" @click="$router.push('/download')">
          {{ $t("下载APP") }}
        </div>
        <img src="@/assets/login-icon.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { register, sendCode } from "@/api";
import { Toast } from "vant";
import PasswordInput from "@/components/PasswordInput/index.vue";

export default {
  components: { PasswordInput },
  data() {
    return {
      codeButTexst: "发送验证码",
      tiem: null,
      isinviteCode: false,
      form: {
        phone: "", //手机号码
        code: "", //验证码
        pwd: "", //密码
        passwordNew: "", //确认密码
        inviteCode: "", //邀请码
        userName: "", //用户名
      },
    };
  },
  mounted() {
    if (this.$route.query.code) {
      this.form.inviteCode = this.$route.query.code;
      this.isinviteCode = true;
    }
    console.log(this.$route.query.code);
  },
  beforeDestroy() {
    if (this.tiem) {
      clearInterval(this.tiem);
      this.tiem = null;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/lang");
    },
    iniput(e, name) {
      this.form[name] = e;
    },
    async sendCode() {
      if (this.codeButTexst !== "发送验证码") {
        return;
      }
      if (this.form.phone) {
        const res = await sendCode({
          phoneNumber: this.form.phone,
        });
        if (res.status === 0) {
          Toast(this.$t("验证码发送成功"));
          this.codeButTexst = 60;
          this.tiem = setInterval(() => {
            this.codeButTexst = this.codeButTexst - 1;
            if (this.codeButTexst === 0) {
              this.codeButTexst = "发送验证码";
              clearInterval(this.tiem);
            }
          }, 1000);
        }
      }

      console.log(res);
    },
    async registerApi() {
      if (this.form.userName === "") {
        Toast(this.$t("用户名不能为空"));
        return false;
      }
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
      if (res.status === 0) {
        Toast(this.$t("注册成功，请登录"));
        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);
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
      // border-bottom: 4px solid #fff;
      // margin-bottom: 16px;
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

::v-deep .van-button--normal {
  padding: 0 5px;
}

.border-box {
  > img {
    width: 36px;
    height: 36px;
  }
  border-bottom: 4px solid #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .border-quhao {
    align-items: center;
    display: flex;
    padding: 0 20px;
    width: 165px;
    height: 53px;
    line-height: 53px;
    font-size: 31px;
    text-align: center;
    color: #ffffff;
    background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%), #498de4;
    border-radius: 22px;
    margin-left: 20px;
    img {
      width: 30px;
      height: 30px;
      margin-left: 10px;
    }
  }
}
.logon {
  // width: 50%;
  margin: 50px auto 0;
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