<template>
  <div class="wrapper">
    <div class="header">
      <div @click="$router.go(-1)">
        <img src="@/assets/img/go.png" alt="" />
      </div>
      <div @click="$router.push('/login')">{{ $t("已有账户") }}</div>
    </div>
    <div class="content">
      <div class="content-title">{{ $t("注册 Alltech") }}</div>
      <van-form
        ref="form"
        class="form"
        :show-error-message="false"
        label-width="60"
      >
        <van-field
          v-model="form.phone"
          :placeholder="$t('手机号')"
          input-align="left"
        >
          <template slot="label">
            <div class="quhao"><span>+91 </span> <van-icon name="arrow" /></div>
          </template>
        </van-field>
        <van-field
          v-model="form.code"
          :placeholder="$t('验证码')"
          input-align="left"
          center
          clearable
          class="verification"
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
      </van-form>
      <van-button
        class="login"
        @click="registerApi"
        :loading="loading"
        type="primary"
        block
        color="#C1531B"
        :round="true"
      >
        <div>{{ $t("下一步") }}</div>
      </van-button>
      <div class="download" @click="$router.push('/download')">
        {{ $t("下载·Alltech") }}
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
      loading: false,
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
        let res = await sendCode({
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
      } else {
        Toast(this.$t("请先输入手机号"));
      }
    },
    async registerApi() {
      try {
        this.loading = true;
        // if (this.form.userName === "") {
        //   Toast(this.$t("用户名不能为空"));
        //   return false;
        // }
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
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 48px;

  > div:nth-child(1) {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background: #c1531b;
    box-shadow: 0px 36.23px 72.46px 0px rgba(0, 0, 0, 0.15);
    padding: 12px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div:nth-child(2) {
    font-size: 28px;
    font-weight: 600;
    color: #c1531b;
  }
}

.content {
  padding: 32px 96px 32px 96px;
}

.content-title {
  text-align: center;
  font-weight: 600;
  color: #c1531b;
  font-size: 68px;
}

.form {
  width: 100%;

  .van-cell {
    font-size: 36px;
    height: 110px;
    border-radius: 50px;
    background: #ffffff;
    box-shadow: 0px 36.23px 72.46px 0px rgba(0, 0, 0, 0.15);
    margin-top: 48px;

    :deep(.van-field__body) {
      height: 100%;
      padding: 0 12px;

      .van-icon {
        font-size: 32px;
      }
    }
  }
}

.quhao {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #c1531b;
}

.verification {
  :deep(.van-field__button) {
    .van-button {
      font-size: 36px;
      color: #c1531b;
      background-color: transparent;
      border: 0;
    }
  }
}

.login {
  margin-top: 48px;
  font-size: 36px;
  height: 110px;
}

.download {
  font-size: 28px;
  color: #c1531b;
  text-align: center;
  margin-top: 48px;
}
</style>