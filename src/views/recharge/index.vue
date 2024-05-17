<template>
  <div class="wrapper">
    <!-- <van-nav-bar title="充值" left-arrow @click-left="onClickLeft">
      <img :src="fanhui" alt="" slot="left" />
    </van-nav-bar> -->
    <div class="header">
      <img src="@/assets/recharge-bg.png" alt="" />
      <div class="fanhui">
        <img @click="$router.go(-1)" :src="fanhui" alt="" />
        <div>充值</div>
      </div>
      <div class="header-card">
        <img src="@/assets/recharge-card.png" alt="" />
        <div class="header-card-money">₹0.00</div>
      </div>
    </div>
    <div class="box">
      <div class="box-title">选择充值金额</div>
      <div class="box-money">
        <div
          :class="moneyKey == item.num ? 'active' : ''"
          v-for="(item, i) in moneyList"
          :key="i"
          @click="moneyKey = item.num"
        >
          {{ RMB(item.num) }}
        </div>
      </div>
      <van-field
        class="money-input"
        :class="moneyKey == 'input' ? 'input-active' : ''"
        type="number"
        v-model="moneyInput"
        label="充值金额"
        placeholder="请输入大于100的充值金额"
        @focus="inputFocus"
      />
      <div class="box-mode">
        <div class="box-mode-title">选择充值方式</div>
        <van-radio-group
          v-model="radio"
          class="box-mode-radio"
          icon-size="20px"
          checked-color="#C0A069"
        >
          <van-cell-group>
            <van-cell title="支付方式一" clickable @click="radio = '1'">
              <div class="mode-radio-icon" slot="icon">
                <img src="@/assets/recharge-icon.png" alt="" />
              </div>
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell title="支付方式二" clickable @click="radio = '2'">
              <div class="mode-radio-icon" slot="icon">
                <img src="@/assets/recharge-icon.png" alt="" />
              </div>
              <van-radio slot="right-icon" name="2" />
            </van-cell>
            <van-cell title="支付方式三" clickable @click="radio = '3'">
              <div class="mode-radio-icon" slot="icon">
                <img src="@/assets/recharge-icon.png" alt="" />
              </div>
              <van-radio slot="right-icon" name="3" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </div>
    <div class="recharge-button">
      <van-button
        type="primary"
        block
        color="linear-gradient(270deg,#cb8954 0%, #f1c096 100%), #c5924f"
        :round="true"
        >立即充值</van-button
      >
    </div>
    <div class="illustrate">
      <div class="illustrate-title">充值说明</div>
      <pre class="illustrate-txt">
        注意！
        1.当你正确的完成付款，资金会在20分钟到达你的账户中
        2.如超过20分钟未到达请联系客服人员寻求帮助
      </pre>
    </div>
  </div>
</template>
<script>
import currency from "currency.js";
export default {
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
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    inputFocus() {
      this.moneyKey = "input";
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
  background-color: #f4f4f4;
  padding-bottom: 16px;
}

.header {
  position: relative;

  .fanhui {
    position: absolute;
    top: 47px;
    left: 0;
    width: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 72px 0 54px;
    font-size: 36px;

    > img {
      width: 18px;
      height: 32px;
    }

    > div {
      flex: 1;
      text-align: center;
    }
  }

  > .header-card {
    position: absolute;
    top: 50%;
    left: 0;
    padding: 0 29px;

    .header-card-money {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 16px;
      height: 77px;
      line-height: 77px;
      background: #fce6c6;
      border-radius: 18px;
      text-align: center;
    }
  }
}

.box {
  margin: 190px 29px 0 29px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 50px 39px;

  .box-title {
    line-height: 33px;
    height: 35px;
    font-size: 36px;
    font-weight: bold;
    color: #87593c;
    text-align: center;
  }

  .box-money {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 36px;

    > div {
      margin-bottom: 22px;
      width: 30%;
      height: 88px;
      line-height: 88px;
      text-align: center;
      border: 3px solid #dfdfdf;
      color: #333333;
      border-radius: 5px;
      font-size: 30px;
    }

    > .active {
      border-radius: 5px;
      background: linear-gradient(to right, #c0a069, #fff);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      border-image: linear-gradient(to right, #c0a069, #e9d5ac) 1 10;
      box-shadow: -9px 0px 28px 9px rgba(195, 163, 109, 0.23);
    }
  }

  .money-input {
    height: 98px;
    font-size: 30px;
    align-items: center;

    :deep(.van-field__label) {
      line-height: 90px;
      font-weight: 600;
      background: linear-gradient(94deg, #c0a069 0%, #e9d5ac 100%);
      -webkit-background-clip: text;
      /* Chrome, Safari */
      background-clip: text;
      -webkit-text-fill-color: transparent;
      /* Chrome, Safari */
      color: transparent;
    }
  }

  .input-active {
    border: 3px solid transparent;
    border-image: linear-gradient(to right, #c0a069, #e9d5ac) 1 10;
  }
}

.box-mode {
  margin-top: 30px;

  .box-mode-title {
    font-size: 30px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: bold;
    text-align: left;
    color: #87593c;
    line-height: 33px;
  }

  .box-mode-radio {
    .van-cell {
      line-height: 40px;
      font-size: 36px;
      margin-top: 15px;

      .mode-radio-icon {
        width: 33px;
        height: 34px;
        margin-right: 16px;
      }
    }

    .van-radio__icon {
      width: 50px;
      height: 50px;
    }
  }
}

.recharge-button {
  margin: 20px 29px 30px 29px;

  .van-button {
    height: 86px;
    line-height: 86px;
    font-size: 26px;
  }
}

.illustrate {
  margin: 0 29px 0 29px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 55px 16px 70px 16px;

  .illustrate-title {
    text-align: center;
    font-size: 36px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: bold;
    color: #87593c;
    line-height: 33px;
  }

  .illustrate-txt {
    white-space: pre-line;
    line-height: 40px;
    font-size: 28px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;
  }
}
</style>