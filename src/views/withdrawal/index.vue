<template>
  <div class="wrapper">
    <div class="header">
      <img src="@/assets/recharge-bg.png" alt="" />
      <div class="fanhui">
        <img @click="$router.go(-1)" :src="fanhui" alt="" />
        <div>提现</div>
      </div>
      <div class="header-card">
        <img src="@/assets/recharge-card.png" alt="" />
        <div class="header-card-money">₹0.00</div>
      </div>
    </div>
    <div class="box">
      <div class="box-title" @click="BankShow = true">选择银行卡</div>
      <div class="box-mode">
        <div class="box-mode-title">选择充值方式</div>
        <van-radio-group
          v-model="radio"
          class="box-mode-radio"
          icon-size="20px"
          checked-color="#C0A069"
        >
          <van-cell-group>
            <van-cell title="银行卡一" clickable @click="radio = '1'">
              <div class="mode-radio-icon" slot="icon">
                <img src="@/assets/recharge-icon.png" alt="" />
              </div>
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell title="银行卡二" clickable @click="radio = '2'">
              <div class="mode-radio-icon" slot="icon">
                <img src="@/assets/recharge-icon.png" alt="" />
              </div>
              <van-radio slot="right-icon" name="2" />
            </van-cell>
            <van-cell title="银行卡三" clickable @click="radio = '3'">
              <div class="mode-radio-icon" slot="icon">
                <img src="@/assets/recharge-icon.png" alt="" />
              </div>
              <van-radio slot="right-icon" name="3" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <van-field
        class="money-input"
        type="number"
        v-model="moneyInput"
        label="提现金额"
        placeholder="请输入大于300的提现金额"
      />
    </div>
    <div class="recharge-button">
      <van-button
        type="primary"
        block
        color="linear-gradient(270deg,#cb8954 0%, #f1c096 100%), #c5924f"
        :round="true"
        @click="popupShow = true"
        >提现</van-button
      >
    </div>
    <div class="illustrate">
      <div class="illustrate-title">规则</div>
      <pre class="illustrate-txt">
        注意！
        1.当你正确的完成付款，资金会在20分钟到达你的账户中
        2.如超过20分钟未到达请联系客服人员寻求帮助
      </pre>
    </div>
    <van-overlay :show="popupShow">
      <div class="overlay-box">
        <div class="overlay-content">
          <img src="@/assets/withdrawal-popup.png" alt="" />
          <div class="overlay-content-title">Withdrawal OTP certification</div>
          <van-cell-group class="overlay-form">
            <van-field v-model="popupForm.value1" placeholder="请输入" />
            <div class="form-password">
              <van-field
                center
                clearable
                v-model="popupForm.value2"
                placeholder="请输入"
              >
              </van-field>
              <div class="form-password-button">Get OTP</div>
            </div>
          </van-cell-group>
          <van-button
            class="overlay-submit"
            type="primary"
            block
            color="#D6212E"
            :round="true"
            >withdraw money</van-button
          >
          <van-icon
            name="close"
            class="overlay-close"
            color="#fff"
            @click="popupShow = false"
          />
        </div>
      </div>
    </van-overlay>

    <van-popup
      v-model="BankShow"
      class="popup-bank"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="bank-title">选择银行卡</div>
      <div class="bank-img">
        <img src="@/assets/recharge-card.png" alt="" />
        <img class="bank-card" src="@/assets/recharge-card.png" alt="" />
      </div>
      <div class="bank-card-add">
        <van-icon name="add" @click="$router.push('/add-bank-card')" />
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fanhui: require("@/assets/fanhui.png"),

      moneyInput: "",
      radio: "1",
      popupShow: false,
      popupForm: {
        value1: "",
        value2: "",
      },
      BankShow: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
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
        font-size: 26px;
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

  .money-input {
    margin-top: 30px;
    height: 98px;
    font-size: 30px;
    align-items: center;
    border: 3px solid transparent;
    border-image: linear-gradient(to right, #c0a069, #e9d5ac) 1 10;

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
}

.recharge-button {
  margin: 20px 29px 30px 29px;

  .van-button {
    height: 86px;
    line-height: 86px;
    font-size: 36px;
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

.overlay-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  position: relative;

  .overlay-content {
    width: 416px;
    height: 478px;
    background: #ffffff;
    border-radius: 13px;
    position: relative;
    padding: 150px 44px 16px 44px;

    > img {
      position: absolute;
      top: -40%;
      left: 20%;
    }

    .overlay-close {
      position: absolute;
      bottom: -20%;
      left: 50%;
      transform: translateX(-50%);
    }

    .overlay-content-title {
      font-size: 20px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: normal;
      color: #333333;
      text-align: center;
      font-weight: 500;
    }

    .overlay-form {
      margin-bottom: 20px;

      .form-password {
        display: flex;
        align-content: center;

        .form-password-button {
          height: 70px;
          line-height: 70px;
          font-size: 20px;
          text-align: center;
          color: #333333;
          width: 147px;
          border: 2px solid #d6212e;
          border-radius: 12px;
          margin-top: 30px;
        }
      }

      .van-cell {
        height: 70px;
        border: 2px solid #cccccc;
        border-radius: 17px;
        margin-top: 30px;
        font-size: 26px;

        :deep(.van-field__body) {
          height: 100%;
        }
      }
    }

    .overlay-submit {
      box-shadow: 0px 0px 11px 0px rgba(214, 33, 46, 0.48);
      height: 60px;
      font-size: 26px;
    }
  }
}

.popup-bank {
  padding: 24px;
  display: flex;
  flex-direction: column;

  :deep(.van-popup__close-icon) {
    font-size: 46px;
  }

  .bank-title {
    font-weight: 500;
    font-size: 32px;
    text-align: center;
    padding: 16px;
  }

  .bank-img {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    > img:nth-child(1) {
      width: 90%;
      height: 90%;
    }

    .bank-card {
      position: absolute;
      top: 80px;
      left: 0;
    }
  }

  .bank-card-add {
    padding: 24px;
    text-align: center;
    font-size: 56px;
  }
}
</style>