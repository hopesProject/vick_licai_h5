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
        <van-col span="6" class="flex-clo">
          <svg-icon iconClass="gywm" style="font-size: 30px"></svg-icon>
          <span>{{ $t("关于我们") }}</span>
        </van-col>
        <van-col span="6" class="flex-clo" @click="$router.push('/share')">
          <svg-icon iconClass="kh" style="font-size: 30px"></svg-icon>
          <span> {{ $t("客户支持") }}</span>
        </van-col>
        <van-col span="6" class="flex-clo" @click="$router.push('/vip-list')">
          <svg-icon iconClass="VIP" style="font-size: 30px"></svg-icon>
          <span> VIP</span>
        </van-col>
        <van-col
          span="6"
          class="flex-clo"
          @click="$router.push('/information')"
        >
          <svg-icon iconClass="gg" style="font-size: 30px"></svg-icon>
          <span> {{ $t("消息") }}</span>
        </van-col>
      </van-row>
    </div>
    <main>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </main>

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
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

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
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: normal;
      text-align: left;
      color: #f2f5fc;
      line-height: 62px;
    }

    span {
      font-size: 22px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

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
      margin-right: 20px;

      img {
        margin: auto;
        width: 33px;
        height: 33px;
      }
    }

    .p-ba {
      font-size: 20px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;
      font-weight: 400;
      text-align: left;
      color: #fcae99;
      line-height: 40px;
      letter-spacing: -0.52px;
      white-space: pre;
    }

    .p-yue {
      font-size: 28px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: bold;
      text-align: left;
      color: #ff977c;
      line-height: 49px;
      letter-spacing: -2.93px;
    }

    .text {
      font-size: 22px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

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
  font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

  font-weight: 400;
  text-align: left;
  color: #333333;
  line-height: 34px;
  letter-spacing: -0.52px;
  display: flex;
  padding: 30px 0 10px;

  .flex-clo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  span {
    margin-top: 15px;
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
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;
    }
  }
}

::v-deep .van-stepper__input {
  font-size: 30px;
  width: 80px;
}
main {
  margin: 20px;
  width: calc(100% - 40px);
  .my-swipe {
    margin-top: 30px;
  }
  .my-swipe .van-swipe-item {
    border-radius: 0.53333rem;
    color: #fff;
    font-size: 20px;
    line-height: 300px;
    text-align: center;
    background-color: #39a9ed;
  }
}
</style>