<template>
  <div class="wrapper">
    <div class="header">
      <come-back :title="$t('资金详情')" />
      <div class="capital-bg"></div>
      <!-- <img src="@/assets/capital-bg.png" alt="" /> -->
      <div class="money">
        <van-row type="flex" justify="space-between" class="money-row">
          <van-col span="12">
            <div class="money-num">
              <img src="@/assets/capital-icon1.png" alt="" />
              <div>
                <span>5000</span>
                <span>充值</span>
              </div>
            </div>
          </van-col>
          <van-col span="12">
            <div class="money-num">
              <img src="@/assets/capital-icon2.png" alt="" />
              <div>
                <span>5000</span>
                <span>提现</span>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="box">
      <van-tabs v-model="active" class="box-tabs" line-height="0">
        <van-tab title="平衡"></van-tab>
        <van-tab title="充电"></van-tab>
        <van-tab title="提取"></van-tab>
      </van-tabs>
      <div class="box-content">
        <div class="content-txt">
          <img src="@/assets/capital-icon3.png" alt="" />
          <div>
            <div>获得I级奖励利润</div>
            <div>+2698.00</div>
          </div>
        </div>
        <div>2022-11-18</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fanhui: require("@/assets/fanhui.png"),
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    inputFocus() {
      this.moneyKey = "input";
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
}
.capital-bg {
  width: 100vw;
  height: 400px;
  background-image: url("@/assets/capital-bg.png");
  background-size: 488px 336px;
  background-repeat: no-repeat;
  background-position: 50% 130px;
}
.header {
  position: relative;
  width: 750px;
  background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%), #ffff00;

  .fanhui {
    color: #fff;
    display: flex;
    align-items: center;
    padding: 20px 72px 0 54px;
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
}

.money {
  padding: 0 20px;
  height: 135px;
  position: absolute;
  bottom: -12%;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);

  .money-row {
    background: linear-gradient(to bottom, #f7c8bf, #ffffff);
    border-radius: 12px;
    height: 100%;

    .money-num {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      > img {
        width: 84px;
        height: 84px;
        border-radius: 50%;
      }

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 16px;

        > span:nth-child(1) {
          font-size: 34px;
          color: #333333;
        }

        > span:nth-child(2) {
          font-size: 26px;
          color: #ff977c;
          text-decoration: underline;
        }
      }
    }
  }
}

.box {
  flex: 1;
  overflow-y: auto;
  background: linear-gradient(to bottom, #ffffff, #f9d9d2);
}

.box-tabs {
  padding: 100px 40px 0 40px;
  width: 100%;

  :deep(.van-tabs__wrap) {
    height: 88px;

    .van-tabs__nav {
      background-color: transparent;
    }

    .van-tab {
      font-size: 30px;
      color: #000;

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
  }
}

.box-content {
  display: flex;
  justify-content: space-between;
  color: #cccccc;
  font-size: 30px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 23px;
  padding: 20px;
  margin: 10px 20px;

  .content-txt {
    display: flex;
    align-items: center;

    > img {
      width: 55px;
      height: 63px;
    }

    > div {
      padding-left: 20px;

      > div:nth-child(1) {
        color: #323232;
      }

      > div:nth-child(2) {
        color: #ff977c;
      }
    }
  }
}
</style>