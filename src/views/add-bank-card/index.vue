<template>
  <div class="wrapper">
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <div>完成资料添加银行卡</div>
      <img src="@/assets/add-bank-bg.png" alt="" />
    </div>
    <div class="box">
      <van-cell-group class="form-field">
        <van-field
          v-model="form.realName"
          :label="$t('姓名')"
          :placeholder="$t('请输入姓名')"
          label-width="80"
        />
        <van-field
          v-model="userInfo.phone"
          :label="$t('手机号')"
          label-width="80"
          readonly
        />
        <van-field
          v-model="form.bankName"
          :label="$t('银行名称')"
          :placeholder="$t('请输入银行名称')"
          label-width="80"
        />
        <van-field
          v-model="form.bankCard"
          :label="$t('银行卡号')"
          :placeholder="$t('请输入银行卡')"
          label-width="80"
        />
        <van-field
          v-model="form.ifsc"
          label="NFSC"
          placeholder="IFSC"
          label-width="80"
        />
        <van-field
          v-model="form.code"
          center
          clearable
          :label="$t('短信验证码')"
          :placeholder="$t('请输入短信验证码')"
        >
          <template #button>
            <van-button size="small" type="primary" @click="sendCode">
              {{ $t(codeButTexst) }}
            </van-button>
          </template>
        </van-field>
      </van-cell-group>

      <div class="submit-button">
        <van-button
          type="primary"
          block
          color="linear-gradient(0deg,#ff947c 0%, #ffb98c 100%), #00a8ff"
          :round="true"
          @click="submit"
        >
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { bindBankCard, sendCode } from "@/api";
import { Toast } from "vant";
import { mapGetters } from "vuex";

export default {
  methods: {
    async sendCode() {
      if (this.codeButTexst !== "发送验证码") {
        return;
      }
      if (this.userInfo.phone) {
        const res = await sendCode({
          phoneNumber: this.userInfo.phone,
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
    },
    async submit() {
      const res = await bindBankCard(this.form);
      if (res.status === 0) {
        Toast(this.$t("绑定银行卡成功"));
      } else {
        Toast(this.$t(res.data.msg));
      }
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  beforeDestroy() {
    if (this.tiem) {
      clearInterval(this.tiem);
      this.tiem = null;
    }
  },
  data() {
    return {
      tiem: null,
      codeButTexst: "发送验证码",
      form: {
        ifsc: "",
        bankCard: "",
        realName: "",
        bankName: "",
        code: "",
      },
    };
  },
};
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

  background-color: #ebf9fc;

  > div {
    color: #999999;
    font-weight: 500;
    text-align: center;
    font-size: 36px;
  }
}

.box {
  flex: 1;
  background: linear-gradient(to bottom, #ffffff, #f9d9d2);
}

.form-field {
  background-color: transparent;

  .van-cell {
    height: 130px;
    font-size: 36px;
    display: flex;
    align-items: center;
    background-color: transparent;

    :deep(.van-field__label) {
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

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