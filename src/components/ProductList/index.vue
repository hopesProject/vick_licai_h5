<template>
  <div class="content-box">
    <HeaderBox />
    <div class="tabs">
      <div
        class="tabs-item"
        :class="tabsAcitve === item.id ? 'tabs-item-active' : ''"
        v-for="(item, index) in tabs"
        :key="index"
        @click="tabsClick(item.id)"
      >
        <div>
          <svg-icon class="font-svg" :iconClass="'Group' + (index + 1)" />
        </div>
        <div>
          {{ item.productClassify }}
        </div>
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
          <div
            class="cell-list"
            v-for="item in data"
            :key="item.id"
            @click="$router.push('/ProductDetails?id=' + item.id)"
          >
            <div class="content-item">
              <div class="goumai">购买</div>
              <div class="zhuangtai">预售</div>
              <div class="img-box">
                <img :src="item.img" alt="" />
              </div>
              <div class="item-text">
                <div class="title">{{ item.productTitle }}</div>

                <div class="flex justify-between">
                  <div class="left">
                    <div>{{ $t("购买价格") }}</div>
                    <div class="text1">{{ item.price }}</div>
                    <div class="top-m">{{ $t("成长周期") }}</div>
                    <div class="text1">{{ item.price }}</div>
                  </div>
                  <div class="right">
                    <div>{{ $t("每日收入") }}</div>
                    <div class="text1">
                      {{ item.dailyProductRevenue | _toLocaleString(false) }}
                    </div>
                    <div class="top-m">{{ $t("总收益") }}</div>
                    <div class="text1">
                      {{
                        (item.dailyProductRevenue * item.cycle)
                          | _toLocaleString(false)
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { buyProduct, productqueryProductClassify } from "@/api";
import { Toast } from "vant";
import { mapGetters } from "vuex";
import refresh from "@/mixins/refresh";
import HeaderBox from "@/components/header";

export default {
  mixins: [refresh],
  components: { HeaderBox },
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
  width: 100%;
  height: 100%;
  background-color: #fff;
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
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 22px;

  .tabs-item {
    width: 231px;

    border-radius: 35px;
    font-size: 23px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;
    font-weight: 400;
    text-align: left;
    color: #999999;
    line-height: 27px;
    letter-spacing: -0.47px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .font-svg {
      font-size: 96px;
      margin-bottom: 24px;
    }
  }

  .tabs-item-active {
  }
}

// :deep(.van-cell__value) {
//   overflow: initial;
// }

.content-item {
  position: relative;
  width: 690px;
  height: 220px;
  opacity: 1;
  background: #ffffff;
  box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: 24px;
  font-weight: normal;
  line-height: 30px;
  letter-spacing: 0.6px;
  font-variation-settings: "opsz" auto;
  color: #818197;

  border-radius: 16px;
  box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .zhuangtai {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 220px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 32px;
    font-weight: 600;

    letter-spacing: 0px;

    color: #f6f6f6;
    background: #d25815;
  }
  .right {
    margin-right: 24px;
    text-align: right;
  }
  .item-text {
    flex: 1;
    margin-top: 18px;
    .top-m {
      margin-top: 12px;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: 0.6px;

      font-variation-settings: "opsz" auto;
      color: #3d3d3d;
      margin-bottom: 22px;
    }
    .text1 {
      font-size: 24px;
      font-weight: 600;
      line-height: 32px;

      letter-spacing: 0.6px;

      font-variation-settings: "opsz" auto;
      color: #d35a18;
    }
  }
  .goumai {
    position: absolute;
    right: 0;
    top: 0;
    width: 180px;
    height: 60px;
    opacity: 1;
    background: #3bb64f;
    text-align: center;
    line-height: 60px;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 0px;
    color: #f6f6f6;
  }
  .img-box {
    width: 220px;
    height: 220px;
    border-radius: 16px;
    opacity: 1;
    overflow: hidden;
    box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.1);
    margin-right: 24px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

:deep(.van-cell) {
  background-color: transparent;
}
:deep(.van-cell::after) {
  border: none;
}
.cell-list {
  width: 690px;
  margin: 0 auto;
  margin-bottom: 24px;
}
:deep(.van-tabbar__placeholder) {
  background-color: #fff;
}
</style>