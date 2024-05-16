<template>
  <div>
    <div class="banner-box">
      <div class="information">
        <span @click="noticeShow = true"> remind：welcome to the...... </span>

        <img @click="$router.push('/information')" :src="laba" alt="" />
      </div>
      <div class="banner-left">
        <div>
          <p>PROFESSION</p>
          <p>becomes value</p>
        </div>
        <span>Invest to create wealth</span>
      </div>
      <div class="banner-right">
        <img :src="bannerRight" alt="" class="" />
      </div>
    </div>
    <div class="yue">
      <div class="yue-item yue-left" @click="$router.push('/recharge')">
        <div class="flex">
          <div class="box-img">
            <img :src="topUp" alt="" />
          </div>
          <div>
            <p class="p-yue">
              {{ userInfo.cumulativeRechargeAmount | _toLocaleString(false) }}
            </p>
            <p class="p-ba">{{ $t("充值金额") }}</p>
          </div>
        </div>
        <div class="flex justify-end text w-full">
          <div>{{ $t("充值") }}</div>
        </div>
      </div>
      <div class="yue-item" @click="$router.push('/withdrawal')">
        <div class="flex">
          <div class="box-img">
            <img :src="topUp" alt="" />
          </div>
          <div>
            <p class="p-yue">
              {{ userInfo.cumulativeWithdrawalAmount | _toLocaleString(false) }}
            </p>
            <p class="p-ba">{{ $t("提现金额") }}</p>
          </div>
        </div>
        <div class="flex justify-end text w-full">
          <div>{{ $t("提现") }}</div>
        </div>
      </div>
    </div>
    <div class="yue icon-text">
      <van-row gutter="10" class="w-full" type="flex" justify="space-between">
        <van-col span="6" class="flex-clo" @click="$router.push('/vip-list')">
          <img :src="icon4" alt="" />
          <span>VIP</span>
        </van-col>
        <van-col span="6" class="flex-clo" @click="$router.push('/capital')">
          <img :src="icon3" alt="" />
          <span> {{ $t("资金流水") }}</span>
        </van-col>
        <van-col span="6" class="flex-clo" @click="$router.push('/share')">
          <img :src="icon2" alt="" />
          <span> {{ $t("分享") }}</span>
        </van-col>
        <van-col span="6" class="flex-clo" @click="$router.push('/team')">
          <img :src="icon1" alt="" />
          <span> {{ $t("团队") }}</span>
        </van-col>
      </van-row>
    </div>

    <div class="content-box">
      <div class="content-bg">
        <div class="Exclusive">
          Exclusive for newcomers
          <p>Click to receive benefits</p>
        </div>
        <div class="go" @click="$router.push('/invite')">GO</div>
      </div>

      <div class="tabs">
        <div
          class="tabs-item"
          :class="tabsAcitve === item.id ? 'tabs-item-active' : ''"
          v-for="(item, index) in tabs"
          :key="index"
          @click="tabsClick(item.id)"
        >
          {{ item.productClassify }}
        </div>
      </div>
      <div class="content-warp">
        <div class="content-item" v-for="(item, index) in data" :key="index">
          <div class="img-box">
            <p><span> VIP1 </span></p>
            <img :src="item.img" alt="" />
          </div>
          <div class="item-text">
            <div>{{ $t("产品基金代码：") }}{{ item.id }}</div>
            <div class="text1">{{ $t("购买价格：") }}{{ item.price }}</div>
            <!-- <div class="text1">
              {{ $t("总收入：") }}{{ item.totalProductRevenue }}
            </div> -->
            <div class="text2">
              {{ $t("日收入：")
              }}{{
                item.dailyProductRevenue | _toLocaleString(false)
              }}&nbsp;&nbsp;&nbsp;{{ $t("累计收入：")
              }}{{
                (item.dailyProductRevenue * item.cycle) | _toLocaleString(false)
              }}
            </div>
          </div>
          <div v-if="token" class="goumai-but" @click="purchaseShowClick(item)">
            {{ $t("购买") }}
          </div>
          <div v-else class="goumai-but" @click="$router.push('/login')">
            {{ $t("登录") }}
          </div>
        </div>
      </div>
    </div>
    <!-- 活动通知 -->
    <van-popup
      v-model="noticeShow"
      class="notice"
      :closeable="true"
      :close-on-click-overlay="false"
    >
      <div class="notice-box">
        <div class="notice-title">{{ $t("活动通知") }}</div>
        <pre class="notice-txt">
          1.最新优惠活动没法及时告诉你哦开通后消息及时推送，不错过任何消息.
          2.最新优惠活动没法及时告诉你哦开通后消息及时推送，不错过任何消息.
          3.最新优惠活动没法及时告诉你哦开通后消息及时推送，不错过任何消息.
        </pre>
      </div>
    </van-popup>
    <!-- 购买弹窗 -->
    <van-overlay :show="purchaseShow" class="purchase">
      <div class="purchase-box">
        <van-icon
          name="close"
          class="purchase-close"
          color="#fff"
          @click="purchaseShow = false"
        />

        <div class="purchase-top">
          <van-row type="flex" justify="space-between" class="purchase-income">
            <van-col span="11">
              <div>
                {{ $t("每日收入：")
                }}{{
                  (purchaseShowData.dailyProductRevenue * stepperValue)
                    | _toLocaleString(false)
                }}
              </div>
            </van-col>
            <van-col span="11">
              <div>
                {{ $t("总收益：") }}

                {{
                  (purchaseShowData.dailyProductRevenue *
                    purchaseShowData.cycle *
                    stepperValue)
                    | _toLocaleString(false)
                }}
              </div>
            </van-col>
          </van-row>
          <van-row type="flex" justify="space-between" class="purchase-num">
            <van-col span="6">{{ $t("购买数量") }}</van-col>
            <van-col span="12">
              <van-stepper v-model="stepperValue" button-size="28px"
            /></van-col>
          </van-row>
        </div>
        <div class="purchase-bottom">
          <img
            src="https://copyright.bdstatic.com/vcg/creative/cc9c744cf9f7c864889c563cbdeddce6.jpg@h_1280"
            alt=""
          />
          <div class="purchase-commodity">
            <div>{{ purchaseShowData.productTitle }}</div>
            <div>
              <span>{{ $t("购买价格：") }}</span
              ><span>{{ purchaseShowData.price }}</span>
            </div>
            <div>
              <span>{{ $t("总价格：") }}</span
              ><span>{{ purchaseShowData.price * stepperValue }}</span>
            </div>
          </div>
        </div>
        <div class="purchase-but">
          <van-button
            type="primary"
            block
            color="linear-gradient(0deg,#ff947c 0%, #ffb98c 100%), linear-gradient(0deg,#e11b31 1%, #f3354e 100%)"
            :round="true"
            @click="ljizhifu"
            >{{ $t("立即支付") }}</van-button
          >
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {
  buyProduct,
  productqueryProductClassify,
  queryProductClassify,
} from "@/api";
import { Toast } from "vant";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["token", "userInfo"]),
    tabs() {
      return this.fenleiData;
    },
  },
  mounted() {
    console.log();
    this.getfenlei();
  },
  methods: {
    async ljizhifu() {
      const res = await buyProduct({
        pid: this.purchaseShowData.id,
        num: this.stepperValue,
      });

      if (res.status === 0) {
        this.purchaseShow = false;
        setTimeout(() => {
          Toast.success(this.$t(`购买成功`));
        }, 1000);
        this.$router.push("/purchase-history");
      } else {
        this.purchaseShow = false;
      }
    },
    async purchaseShowClick(item) {
      this.purchaseShow = true;
      this.purchaseShowData = item;
    },
    tabsClick(item) {
      this.tabsAcitve = item;
      this.getlist();
    },
    async getfenlei() {
      const res = await queryProductClassify();
      if (res.status === 0) {
        localStorage.setItem("fenleiData", JSON.stringify(res.data));
        localStorage.setItem("tabsAcitve", JSON.stringify(res.data[0].id));
        this.fenleiData = res.data;
        this.tabsAcitve = res.data[0].id;
        this.getlist();
      }
    },
    async getlist() {
      this.data = [];
      let id = this.tabsAcitve;
      const res = await productqueryProductClassify({ id: this.tabsAcitve });
      if (res.status === 0 && this.tabsAcitve === id) {
        this.data = res.data;
      }
    },
  },
  data() {
    return {
      purchaseShowData: {},
      fenleiData: localStorage.getItem("fenleiData")
        ? JSON.parse(localStorage.getItem("fenleiData"))
        : [],
      data: [],
      bannerRight: require("@/assets/banner-right.png"),
      laba: require("@/assets/laba.png"),
      topUp: require("@/assets/top-up.png"),
      Withdrawal: require("@/assets/Withdrawal.png"),
      icon1: require("@/assets/icon1.png"),
      icon2: require("@/assets/icon2.png"),
      icon3: require("@/assets/icon3.png"),
      icon4: require("@/assets/icon4.png"),
      homeJe: require("@/assets/home-je.png"),
      tabsAcitve: localStorage.getItem("tabsAcitve")
        ? JSON.parse(localStorage.getItem("tabsAcitve"))
        : 2,
      noticeShow: false,
      purchaseShow: false,
      stepperValue: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.content-warp {
  padding: 0 20px 20px;
  padding-bottom: 300px;

  .content-item {
    width: 710px;
    height: 254px;
    background: #ffffff;
    border-radius: 40px;
    box-shadow: -0.28px 3.99px 30px 4px rgba(165, 188, 251, 0.4);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    margin-bottom: 10px;

    .item-text {
      font-size: 25px;
      font-family: SourceHanSansCN, SourceHanSansCN-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;

      .text1 {
        font-size: 21px;
        font-family: SourceHanSansCN, SourceHanSansCN-Regular;
        font-weight: 400;
        text-align: left;
        color: #999999;
        margin-top: 14px;
      }

      .text2 {
        margin-top: 18px;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #fc755b;
      }
    }

    .goumai-but {
      width: 130px;
      line-height: 130px;
      border: 2px solid #ff947c;
      border-radius: 50%;
      font-size: 36px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: center;
      color: #fc755b;
    }

    .img-box {
      position: relative;

      p {
        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: bold;
        text-align: left;
        text-align: center;
        color: #f4f4f4;
        line-height: 39px;
        line-height: 38px;
        width: 112px;
        display: block;
        background: #f4f4f4;
        border-radius: 19px;
        position: absolute;
        top: -20px;
        left: 50%;

        span {
          background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%);
          -webkit-background-clip: text;
          /* Chrome, Safari */
          background-clip: text;
          -webkit-text-fill-color: transparent;
          /* Chrome, Safari */
          color: transparent;
          /* 兼容不支持background-clip的浏览器 */
        }

        transform: translateX(-50%);
      }

      img {
        width: 169px;
        height: 159px;
        border-radius: 8px;
      }
    }
  }
}

.tabs {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 22px;

  .tabs-item {
    width: 231px;
    height: 69px;
    border-radius: 35px;
    font-size: 23px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;
    line-height: 27px;
    letter-spacing: -0.47px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 37px;
      height: 37px;
      margin-right: 10px;
    }
  }

  .tabs-item-active {
    background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%), #fb0389;
    color: #fcfcfc;
  }
}

.content-box {
  margin-top: 18px;
  width: 100%;
  height: 100%;

  .content-bg {
    margin: 0 18px;
    width: 721px;
    height: 207px;
    background-image: url("@/assets/home-je.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;

    .go {
      position: absolute;
      left: 600px;
      top: 35px;
      font-size: 40px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;
      color: #ffe4ed;
      line-height: 140px;
    }

    .Exclusive {
      width: 255px;
      font-size: 32px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: bold;
      text-align: left;
      color: #fd8247;
      line-height: 43px;
      position: absolute;
      left: 300px;
      top: 40px;

      p {
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: bold;
        text-decoration: underline;
        text-align: left;
        color: #fdfcfb;
        line-height: 43px;
      }
    }
  }
}

.banner-box {
  position: relative;
  width: 750px;
  height: 515px;
  background-color: #fff;
  border-bottom-left-radius: 60px;
  background-image: url("@/assets/banner-bg.png");
  background-size: cover;
  /* 背景图片覆盖整个元素 */
  display: flex;
  justify-content: space-between;
  box-shadow: -0.28px 3.99px 30px 4px rgba(165, 188, 251, 0.4);

  .information {
    width: 100%;
    position: absolute;
    bottom: 15px;
    padding-left: 70px;
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #999999;

    img {
      width: 55px;
      height: 54px;
      position: absolute;
      right: 70px;
      bottom: 0;
    }
  }

  .banner-left {
    padding-left: 50px;
    margin-top: 100px;

    div {
      font-size: 45px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      text-align: left;
      color: #f2f5fc;
      line-height: 62px;
    }

    span {
      font-size: 22px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
      font-weight: normal;
      text-align: left;
      color: #f2f5fc;
      line-height: 62px;
    }
  }

  .banner-right {
    img {
      margin-top: 100px;
      width: 385px;
      height: 398px;
    }
  }
}

.yue {
  width: 710px;

  background: #ffffff;
  border-radius: 40px;
  box-shadow: -0.28px 3.99px 30px 4px rgba(165, 188, 251, 0.4);
  margin: 18px 20px 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  .yue-item {
    flex: 1;
    margin: 33px 0;
    background-image: url("@/assets/bg-top.png");
    background-size: 100% 100%;
    /* 背景图片覆盖整个元素 */
    padding: 20px;

    .box-img {
      width: 75px;
      height: 75px;
      background: linear-gradient(22deg, #ff947c 0%, #ffb98c 100%), #fce0d3;
      border-radius: 50%;
      justify-content: center;

      display: flex;

      img {
        margin: auto;
        width: 33px;
        height: 33px;
      }
    }

    .p-ba {
      font-size: 26px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;
      color: #fcae99;
      line-height: 40px;
      letter-spacing: -0.52px;
      white-space: pre;
    }

    .p-yue {
      font-size: 37px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: bold;
      text-align: left;
      color: #ff977c;
      line-height: 49px;
      letter-spacing: -2.93px;
    }

    .text {
      font-size: 26px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      color: #fcae99;

      div {
        min-width: 194px;
        line-height: 62px;
        background: #fbe5db;
        border: 4px solid #fcefec;
        border-radius: 140px;
        text-align: center;
        // margin-right: 24px;
      }
    }
  }

  .yue-left {
    margin-right: 30px;
  }
}

.icon-text {
  font-size: 26px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
  line-height: 34px;
  letter-spacing: -0.52px;
  display: flex;
  padding: 30px 0;

  .flex-clo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  span {
    display: inline-block;
    height: 60px;
  }

  img {
    width: 105px;
    height: 110px;
  }
}

.notice {
  background-color: transparent;

  :deep(.van-popup__close-icon) {
    font-size: 50px;
  }

  .notice-box {
    width: 663px;
    height: 759px;
    padding: 20% 17% 20% 15%;
    background-image: url("@/assets/notice-bg.png");
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    color: #fff;
    align-items: center;
    font-weight: 400;

    .notice-title {
      font-size: 44px;
    }

    .notice-txt {
      flex: 1;
      overflow-y: auto;
      white-space: pre-line;
      line-height: 40px;
      font-size: 28px;
      font-family: PingFang SC, PingFang SC-Regular;
    }
  }
}

.purchase {
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;

  .purchase-box {
    width: 586px;
    height: 503px;
    background-image: url("@/assets/purchase.png");
    background-size: 100% 100%;
    padding: 40px 55px 55px 55px;
    font-size: 24px;
    position: relative;

    .purchase-close {
      position: absolute;
      bottom: -20%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 60px;
    }

    .purchase-top {
      font-size: 18px;
      .purchase-income {
        .van-col {
          > div {
            line-height: 72px;
            border: 1px solid #ffebcd;
            border-radius: 8px;
            text-align: center;
            color: #ffefd1;
          }
        }
      }

      .purchase-num {
        margin-top: 20px;
        text-align: center;

        .van-col {
          color: #ffefd1;
        }
      }
    }

    .purchase-bottom {
      margin: 40px 10px 10px 10px;
      display: flex;

      > img {
        width: 150px;
        height: 150px;
        border-radius: 8px;
      }

      .purchase-commodity {
        flex: 1;
        font-weight: normal;
        padding-left: 16px;

        > div {
          font-size: 24px;
          display: flex;

          > span:nth-child(1) {
            color: #676767;
          }

          > span:nth-child(2) {
            color: #000000;
          }
        }

        > div:nth-child(1) {
          font-size: 30px;
          text-align: left;
          color: #cc1127;
        }
      }
    }

    .purchase-but {
      margin-top: 50px;
      padding: 0 50px;

      .van-button {
        height: 70px;
        font-size: 32px;

        .van-button__text {
          color: #f4e1c5;
        }
      }
    }
  }
}

::v-deep .van-stepper__input {
  font-size: 30px;
  width: 80px;
}
</style>