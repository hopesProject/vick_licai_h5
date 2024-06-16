<template>
  <div class="wrapper">
    <HeaderBox />
    <main>
      <div class="information">
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
          <van-swipe-item v-for="(item, i) in bannerList" :key="i">
            <div class="swipe-container" @click="dianji(item.url)">
              <img :src="item.img" alt="" />
            </div>
          </van-swipe-item>
        </van-swipe>
        <div class="nav">
          <div v-for="(item, i) in navList" :key="i" @click="onSkip(item.key)">
            <img :src="item.img" alt="" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="bulletin">
        <div class="bulletin-left">
          <img src="@/assets/img/bulletin-bg.png" alt="" />
          <div>
            <span>{{ $t("快讯播报") }}</span>
            <span>{{ $t("邀请好友获得丰富奖励") }}</span>
          </div>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="wallet">
        <div class="wallet-money">
          <div class="wallet-money-left">
            <span>{{ $t("总资金") }}</span>
            <span>{{ userInfo.amount | _toLocaleString() }}</span>
          </div>
          <div class="wallet-money-right">
            <div @click="$router.push('/recharge')">{{ $t("充值") }}</div>
            <div @click="$router.push('/withdrawal')">{{ $t("提现") }}</div>
          </div>
        </div>
        <div class="wallet-history">
          <div>
            <span>{{ $t("充值金额") }}</span>
            <span>{{
              userInfo.cumulativeRechargeAmount | _toLocaleString()
            }}</span>
          </div>
          <div>
            <span>{{ $t("可提现金额") }}</span>
            <span>{{ userInfo.canWithdrawAmount | _toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <div class="popular">
        <div class="header-h1">{{ $t("热门产品") }}</div>
        <van-swipe :loop="false" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in isHotData" :key="index">
            <div class="popular-content">
              <div class="img-box">
                <img :src="$utils.getImgUrl(item.img)" alt="" />
              </div>
              <div class="popular-right">
                <div class="popular-product">
                  <div>
                    <span>{{ $t("产品价格") }}</span>
                    <span>{{ item.price }}</span>
                  </div>
                  <div
                    v-if="token"
                    class="goumai-but"
                    @click="$router.push('/ProductDetails?id=' + item.id)"
                  >
                    {{ $t("购买") }}
                  </div>
                  <div
                    v-else
                    class="goumai-but"
                    @click="$router.push('/login')"
                  >
                    {{ $t("登录") }}
                  </div>
                </div>
                <div class="popular-income">
                  <div>
                    <span>{{ $t("日收入") }}</span>
                    <span>
                      {{
                        item.dailyProductRevenue | _toLocaleString(false)
                      }}</span
                    >
                  </div>
                  <div>
                    <span>{{ $t("总收益") }}</span>
                    <span>{{
                      (item.dailyProductRevenue * item.cycle)
                        | _toLocaleString(false)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="journalism">
        <div class="header-h1">{{ $t("新闻快讯") }}</div>
        <div
          class="journalism-box"
          v-for="(item, i) in journalismList"
          :key="i"
          @click="getRouter(item)"
        >
          <div class="journalism-box-img">
            <img :src="$utils.getImgUrl(item.img)" alt="" />
          </div>
          <div class="journalism-box-txt">
            <span>{{ item.title }}</span>
            <span>{{ item.ndesc }}</span>
            <span>{{ item.createTime | _timeFormat }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import {
  productqueryProductClassify,
  queryBannerList,
  queryNews,
  queryProductClassify,
  queryProductisHot,
} from "@/api";
import { mapActions, mapGetters } from "vuex";

import HeaderBox from "@/components/header";
export default {
  components: { HeaderBox },
  data() {
    return {
      bannerList: [],
      isHotData: [],
      noticeShow: false,
      purchaseShow: false,
      purchaseShowData: {},
      stepperValue: 1,
      journalismList: [],
    };
  },
  computed: {
    ...mapGetters(["token", "userInfo"]),

    navList() {
      return [
        {
          title: this.$t("我们"),
          img: require("@/assets/img/my.png"),
          key: "/about",
        },
        {
          title: this.$t("客服"),
          img: require("@/assets/img/service.png"),
          key: "/service",
        },
        {
          title: this.$t("奖励"),
          img: require("@/assets/img/reward.png"),
          key: "/commission",
        },
        {
          title: "VIP",
          img: require("@/assets/img/vip-icon.png"),
          key: "/vip-list",
        },
      ];
    },
  },
  mounted() {
    this.getqueryProductisHot();
    this.getNes();
    this.queryBannerList();
    if (this.token) {
      this.getUserInfo();
    }
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    dianji(url) {
      window.open(url);
    },
    // 获取轮播图
    async queryBannerList() {
      try {
        const res = await queryBannerList();
        res.data.map((item) => {
          item.img = this.$utils.getImgUrl(item.img);
        });

        this.bannerList = res.data;
      } catch (error) {}
    },
    getRouter(item) {
      this.$router.push("/itemInformation?type=nes&id=" + item.id);
    },
    // 获取新闻
    async getNes() {
      try {
        const res = await queryNews({ pageSize: 100 });
        this.journalismList = res.data.list;
      } catch (error) {}
    },
    // 热门铲平
    async getqueryProductisHot() {
      const res = await queryProductisHot();
      if (res.status === 0) {
        this.isHotData = res.data;
      }
    },

    onSkip(key) {
      this.$router.push(key);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  background-color: #f6f6f6;
}
main {
  padding: 0px 30px;
}

.information {
  margin: 38px 0 170px 0;
  position: relative;
  .my-swipe {
    width: 100%;
    height: 320px;
  }
  .swipe-container {
    height: 320px;
    border-radius: 16px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .nav {
    width: 100%;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0px -16px 20px 0px rgba(0, 0, 0, 0.0386);
    padding: 33px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: -40%;

    > div {
      font-size: 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > img {
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
      }
    }
  }
}

.bulletin {
  border-radius: 16px;
  background: #fff;
  border: 1px dashed #ededed;
  box-shadow: 0px -16px 20px 0px rgba(0, 0, 0, 0.0386);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 29px;

  .bulletin-left {
    display: flex;
    align-items: center;

    > img {
      width: 90px;
      height: 85px;
    }

    > div {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      font-size: 28px;
    }
  }
}

.wallet {
  width: 100%;
  padding: 40px;
  border-radius: 16px;
  background: linear-gradient(92deg, #d25815 0%, #dd824f 98%);
  margin-top: 36px;

  .wallet-money {
    width: 100%;
    display: flex;
    justify-content: space-between;

    > div {
      // width: 50%;
    }

    .wallet-money-left {
      display: flex;
      flex-direction: column;
      color: #f6f6f6;

      > span:nth-child(1) {
        font-size: 28px;
        margin-bottom: 18px;
      }

      > span:nth-child(2) {
        font-weight: 600;
        font-size: 34px;
      }
    }

    .wallet-money-right {
      display: flex;
      justify-content: space-between;
      align-items: end;

      > div {
        background: #f6f6f6;
        padding: 0 10px;
        min-width: 140px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-radius: 30px;
        font-size: 32px;
        color: #333333;
      }

      > div:nth-child(1) {
        color: #b80000;
        margin-right: 10px;
      }
    }
  }

  .wallet-history {
    display: flex;
    margin-top: 32px;

    > div {
      width: 50%;
      font-size: 28px;
      color: #f6f6f6;
      display: flex;
      flex-direction: column;

      > span:nth-child(2) {
        font-weight: 600;
      }
    }
  }
}

.header-h1 {
  font-size: 28px;
  font-weight: 600;
  line-height: 39px;
  letter-spacing: 0px;

  color: #333333;
  margin: 38px 0;
}

.popular {
  .popular-content {
    display: flex;
    border-radius: 18px;
    background: #fff;
    padding: 32px 24px;

    .img-box {
      width: 226px;
      height: 226px;

      > img {
        width: 226px;
        height: 226px;
        border-radius: 18px;
      }
    }

    .popular-right {
      flex: 1;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .popular-product {
        display: flex;
        justify-content: space-between;

        > div:nth-child(1) {
          font-size: 24px;
          color: #666666;
          font-weight: 600;
          display: flex;
          flex-direction: column;

          > span:nth-child(2) {
            font-size: 24px;
            color: #333333;
            font-weight: normal;
          }
        }

        .goumai-but {
          width: 168px;
          height: 68px;
          line-height: 68px;
          text-align: center;
          border-radius: 16px;
          color: #f6f6f6;
          font-size: 24px;
          font-weight: 600;
          background: #d25815;
        }
      }

      .popular-income {
        display: flex;
        justify-content: space-between;

        > div {
          display: flex;
          flex-direction: column;
          font-size: 24px;
          font-weight: 600;
          color: #666666;

          > span:nth-child(2) {
            font-size: 24px;
            font-weight: normal;
            color: #ff6e00;
          }
        }
      }
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
    // height: 503px;
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
          padding: 20px 10px;
          border-radius: 8px;
          border: 1px solid #ffebcd;
          display: flex;
          align-items: center;

          > div {
            // line-height: 72px;
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
        width: 130px;
        height: 130px;
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

.journalism-box {
  display: flex;
  margin-bottom: 24px;
  background-color: #fff;
  padding: 32px 24px;
  border-radius: 18px;

  .journalism-box-img {
    width: 220px;
    height: 220px;
    min-width: 220px;
    > img {
      width: 220px;
      height: 220px;
      border-radius: 16px;
    }
  }

  .journalism-box-txt {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #333333;
    font-size: 24px;
    padding-left: 16px;

    > span:nth-child(1) {
      font-size: 32px;
      overflow: hidden;
      text-overflow: ellipsis;
      // white-space: nowrap;
      font-weight: 600;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 限制最多显示 2 行 */
      -webkit-box-orient: vertical;
    }

    > span:nth-child(2) {
      font-size: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>