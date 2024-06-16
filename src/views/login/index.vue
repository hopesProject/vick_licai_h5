<template>
  <div class="wrapper">
    <div class="header">
      <div v-show="loginShow" @click="loginShow = !loginShow">
        <img src="@/assets/img/go.png" alt="" />
      </div>
      <span></span>
      <div @click="$router.push('/lang')">
        <img src="@/assets/img/language.png" alt="" />
      </div>
    </div>
    <div class="content">
      <div class="content-icon">
        <img src="@/assets/img/alltech.png" alt="" />
      </div>
      <van-form class="form" :show-error-message="false">
        <template v-if="loginShow">
          <van-field
            v-model="form.phone"
            :placeholder="$t('请输入手机号')"
            input-align="left"
            v-autocomplete
          />
          <PasswordInput
            :placeholder="$t('请输入密码')"
            name="password"
            v-autocomplete
            @change="iniput"
          />
          <div class="forget" @click="$router.push('/password')">
            {{ $t("忘记密码") }}
          </div>
        </template>
      </van-form>
      <div class="foot">
        <template v-if="!loginShow">
          <van-button
            @click="loginShow = !loginShow"
            type="primary"
            block
            color="#C1531B"
            :round="true"
          >
            {{ $t("登录") }}
          </van-button>
          <van-button
            class="register"
            @click="$router.push('/register')"
            type="primary"
            block
            color="#FFFFFF"
            :round="true"
          >
            <div class="register-txt">
              <span>{{ $t("注册") }} </span>
              <img src="@/assets/img/arrow-right.png" alt="" />
            </div>
          </van-button>
        </template>
        <template v-else>
          <van-button
            @click="onSubmit"
            :loading="loading"
            type="primary"
            block
            color="#C1531B"
            :round="true"
          >
            <div class="login">
              <span>{{ $t("登录") }}</span>
              <img src="@/assets/img/white-arrow-right.png" alt="" />
            </div>
          </van-button>
          <div class="download" @click="$router.push('/download')">
            {{ $t("下载·Alltech") }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api";
import { Toast } from "vant";
import { mapActions, mapMutations } from "vuex";
import PasswordInput from "@/components/PasswordInput/index.vue";
export default {
  components: { PasswordInput },
  data() {
    return {
      loading: false,
      loginShow: false,
      form: {
        phone: "",
        password: "",
      },
    };
  },
  mounted() {
    if (this.$route.query.token) {
      this.SET_TOKEN(JSON.parse(this.$route.query.token));
      Toast.success(this.$t("登录成功"));
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    }
  },
  methods: {
    ...mapActions(["getLogin"]),
    ...mapMutations(["SET_TOKEN"]),

    iniput(e, name) {
      this.form[name] = e;
    },
    async onSubmit() {
      try {
        if (!this.form.phone) {
          return Toast.fail(this.$t("请输入手机号码"));
        }
        if (!this.form.password) {
          return Toast.fail(this.$t("请输入密码"));
        }
        this.loading = true;
        const res = await login(this.form);
        if (res.status == 0) {
          this.getLogin(res.data);
          Toast.success(this.$t("登录成功"));
          setTimeout(() => {
            this.$router.push("/");
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
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fdfdfd;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 14px 48px;

  > div {
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
}

.content {
  flex: 1;
  padding: 0 98px 0 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 36px;
  padding-top: 132px;

  img {
    margin-bottom: 36px;
    width: 300px;
    height: 88px;
  }
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

.forget {
  width: 100%;
  text-align: left;
  margin-top: 48px;
  font-size: 24px;
  color: #666666;
  padding-left: 36px;
  font-weight: 600;
}

.foot {
  width: 100%;
  padding: 132px 0 132px 0;

  .van-button {
    height: 110px;
    font-size: 36px;
  }

  .login {
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      width: 36px;
      height: 36px;
      margin-left: 24px;
    }
  }

  .register {
    margin-top: 24px;
    box-shadow: 0px 36.23px 72.46px 0px rgba(0, 0, 0, 0.15);

    .register-txt {
      color: #c0531b;
      display: flex;
      align-items: center;
      justify-content: center;

      > img {
        width: 36px;
        height: 36px;
      }
    }
  }

  .download {
    font-size: 28px;
    color: #c1531b;
    text-align: center;
    margin-top: 88px;
  }
}
</style>