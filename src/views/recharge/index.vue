<template>
  <div class="wrapper">
    <van-nav-bar
      :title="$t('充值')"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="content">
      <div class="balance">
        <img class="flower" src="@/assets/img/recharge-flower.png" alt="" />
        <div class="balance-money">
          <div>
            <div>{{ $t("余额") }}</div>
            <div>{{ userInfo.amount | _toLocaleString(false) }}</div>
          </div>
          <img src="@/assets/img/circular.png" alt="" />
        </div>
      </div>
      <div class="form">
        <div class="form-title">{{ $t("充值金额") }}</div>
        <van-row gutter="16" type="flex" justify="space-around">
          <van-col
            span="12"
            :class="moneyKey == item.num ? 'active' : ''"
            v-for="(item, i) in moneyList"
            :key="i"
            @click="setMone(item.num)"
          >
            <!-- moneyKey = item.num -->
            <div class="box-money">{{ RMB(item.num) }}</div>
          </van-col>
        </van-row>
        <van-field
          class="money-input"
          type="number"
          v-model="moneyInput"
          :label="$t('其他金额')"
          :placeholder="$t('请输入大于100的充值金额')"
        />
        <div class="mode">
          <div class="mode-title">{{ $t("支付方式") }}</div>
          <van-radio-group
            v-model="radio"
            class="box-mode-radio"
            icon-size="20px"
            checked-color="#D25815"
          >
            <van-cell-group>
              <van-cell title="支付宝" clickable @click="radio = '1'">
                <van-radio slot="right-icon" name="1" />
              </van-cell>
              <van-cell title="微信" clickable @click="radio = '2'">
                <van-radio slot="right-icon" name="2" />
              </van-cell>
              <van-cell title="银行卡" clickable @click="radio = '3'">
                <van-radio slot="right-icon" name="3" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="recharge-button">
          <van-button
            type="primary"
            block
            color="linear-gradient(272deg, #F44848 0%, #FF782D 104%)"
            :round="true"
            @click="rechage"
            >{{ $t("立即充值") }}</van-button
          >
        </div>
      </div>
      <div class="illustrate">
        <div class="illustrate-title">{{ $t("充值说明") }}</div>
        <pre class="illustrate-txt">
      <p>  {{ $t("1.当你正确的完成付款，资金会在20分钟到达你的账户中") }}</p>
      <p>{{ $t('2.如超过20分钟未到达请联系客服人员寻求帮助') }}</p>
      </pre>
      </div>
    </div>
  </div>
</template>
<script>
import { rechage } from "@/api";
import currency from "currency.js";
import { Toast } from "vant";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      fanhui: require("@/assets/fanhui.png"),
      moneyList: [
        {
          num: "300",
        },
        {
          num: "400",
        },
        {
          num: "500",
        },
        {
          num: "600",
        },
      ],
      moneyKey: "300",
      moneyInput: "",
      radio: "1",
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    async rechage() {
      if (!this.moneyInput) {
        return Toast(this.$t("请输入充值金额"));
      }
      try {
        const res = await rechage({
          amount: this.moneyInput,
          payMethod: "",
        });
        Toast.success(this.$t("充值成功"));
        setTimeout(() => {
          this.$router.push("/my");
        }, 1000);
      } catch (error) {}
    },
    setMone(num) {
      this.moneyInput = num;
    },
    RMB(value) {
      value = value ?? 0;
      return currency(value, { precision: 2, symbol: "$" }).format();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f6;
}

.content {
  padding: 54px 30px;
}

.balance {
  height: 434px;
  width: 100%;
  background-image: url("@/assets/img/recharge-bg.png");
  background-size: 100%;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  position: relative;

  .flower {
    width: 434px;
  }

  .balance-money {
    height: 180px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background-image: url("@/assets/img/recharge-balance.png");
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:nth-child(1) {
      font-size: 32px;
      padding: 53px 90px;
      color: #fafafa;

      > div:nth-child(2) {
        font-size: 48px;
      }
    }

    > img {
      width: 120px;
      height: 80px;
    }
  }
}

.form {
  border-radius: 32px;
  background: #ffffff;
  box-shadow: 0px 4px 27px 0px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 40px 0;
}

.form-title {
  font-size: 36px;
  font-weight: 600;
  color: #3d3d3d;
  text-align: center;
  margin-bottom: 30px;
}

.box-money {
  height: 108px;
  line-height: 108px;
  text-align: center;
  font-size: 36px;
  background: #f6f6f6;
  border-radius: 32px;
  box-shadow: 0px 4px 27px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 35px;
}

.active {
  > div {
    background: #ffffff;
  }
}

.money-input {
  height: 98px;
  font-size: 30px;
  align-items: center;
  padding: 0;

  :deep(.van-field__label) {
    // line-height: 90px;
    font-weight: 600;
  }
}

.mode {
  .mode-title {
    font-size: 32px;
    color: #3d3d3d;
    padding: 48px 0 36px 0;
  }

  .box-mode-radio {
    .van-cell {
      padding: 58px 36px;
      background: #ffffff;
      border-radius: 32px;
      box-shadow: 0px 4px 27px 0px rgba(0, 0, 0, 0.1);
      font-size: 36px;
      margin-top: 15px;

      .van-cell__title {
        display: flex;
        align-items: center;
      }
    }

    .van-radio__icon {
      width: 50px;
      height: 50px;
    }
  }
}

.recharge-button {
  margin-top: 36px;

  .van-button {
    height: 100px;
    line-height: 100px;
    font-size: 36px;
    border-radius: 30px;
  }
}

.illustrate {
  margin: 48px 0;
  font-weight: 600;

  .illustrate-title {
    font-size: 36px;
    color: #3d3d3d;
    text-align: center;
  }

  .illustrate-txt {
    white-space: pre-line;
    line-height: 60px;
    font-size: 24px;
    font-variation-settings: "opsz" auto;
  }
}
</style>