<template>
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
      <van-pull-refresh
        :pulling-text="$t('下拉即可刷新...')"
        :loosing-text="$t('释放即可刷新...')"
        :loading-text="$t('加载中...')"
        v-model="refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('没有更多了')"
          :loading-text="$t('加载中...')"
          @load="onLoad"
        >
          <van-cell v-for="item in data" :key="item.id">
            <div class="content-item">
              <div class="img-box">
                <p><span> VIP1 </span></p>
                <img :src="item.img" alt="" />
              </div>
              <div class="item-text">
                <div>{{ $t("产品基金代码：") }}{{ item.id }}</div>
                <div class="text1">{{ $t("购买价格：") }}{{ item.price }}</div>
                <div class="text2">
                  <div>
                    {{ $t("日收入：") }}
                    {{ item.dailyProductRevenue | _toLocaleString(false) }}
                  </div>
                  <div>
                    {{ $t("累计收入：") }}
                    {{
                      (item.dailyProductRevenue * item.cycle)
                        | _toLocaleString(false)
                    }}
                  </div>
                </div>
              </div>
              <div
                v-if="token"
                class="goumai-but"
                @click="purchaseShowClick(item)"
              >
                {{ $t("购买") }}
              </div>
              <div v-else class="goumai-but" @click="$router.push('/login')">
                {{ $t("登录") }}
              </div>
            </div>
          </van-cell>
          <!-- <div slot="finished"></div> -->
        </van-list>
      </van-pull-refresh>
    </div>
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
import { buyProduct, productqueryProductClassify } from "@/api";
import { Toast } from "vant";
import { mapGetters } from "vuex";
import refresh from "@/mixins/refresh";

export default {
  mixins: [refresh],

  computed: {
    ...mapGetters(["token", "userInfo"]),
    tabs() {
      return this.fenleiData;
    },
  },
  data() {
    return {
      stepperValue: 1,
      purchaseShow: false,
      purchaseShowData: {},
      data: [],
      fenleiData: localStorage.getItem("fenleiData")
        ? JSON.parse(localStorage.getItem("fenleiData"))
        : [],
      tabsAcitve: localStorage.getItem("tabsAcitve")
        ? JSON.parse(localStorage.getItem("tabsAcitve"))
        : 2,
    };
  },
  mounted() {
    // this.getlist();
  },
  methods: {
    async ljizhifu() {
      const res = await buyProduct({
        pid: this.purchaseShowData.id,
        num: this.stepperValue,
      });

      if (res.status === 0) {
        this.purchaseShow = false;
        Toast.success(this.$t(`购买成功`));
        setTimeout(() => {
          this.$router.push("/purchase-history");
        }, 1000);
      } else {
        this.purchaseShow = false;
      }
    },
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await productqueryProductClassify({
        id: this.tabsAcitve,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      });
      if (isRefreshing) {
        this.refreshing = false;
      }
      this.loading = false;
      try {
        if (res?.status === 0) {
          if (pageNum !== 1) {
            this.data = [...this.data, ...res.data];
          } else {
            this.data = res.data;
          }
        }
        // if (this.data.length >= res.data.total) {
        this.finished = true;
        // }
      } catch (error) {
        this.finished = true;
      }
    },
    // async getlist() {
    //   this.data = [];
    //   let id = this.tabsAcitve;
    //   const res = await productqueryProductClassify({ id: this.tabsAcitve });
    //   if (res.status === 0 && this.tabsAcitve === id) {
    //     this.data = res.data;
    //   }
    // },
    async purchaseShowClick(item) {
      this.purchaseShow = true;
      this.purchaseShowData = item;
    },
    tabsClick(item) {
      this.pageNum = 1;
      this.tabsAcitve = item;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
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
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: 400;
      text-align: left;
      color: #ffe4ed;
      line-height: 140px;
    }

    .Exclusive {
      width: 255px;
      font-size: 32px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: bold;
      text-align: left;
      color: #fd8247;
      line-height: 43px;
      position: absolute;
      left: 300px;
      top: 40px;

      p {
        font-size: 16px;
        font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

        font-weight: bold;
        text-decoration: underline;
        text-align: left;
        color: #fdfcfb;
        line-height: 43px;
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
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

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
.content-warp {
  padding: 0 20px 20px;
  padding-bottom: 300px;

  .content-item {
    // width: 710px;
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
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;
      margin-left: 20px;
      font-weight: 400;
      text-align: left;
      color: #333333;

      .text1 {
        font-size: 21px;
        font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

        font-weight: 400;
        text-align: left;
        color: #999999;
        margin-top: 14px;
      }

      .text2 {
        margin-top: 18px;
        font-size: 18px;
        font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

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
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: 400;
      text-align: center;
      color: #fc755b;
    }

    .img-box {
      position: relative;

      p {
        font-size: 24px;
        font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

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
</style>