<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" :title="$t('收益记录')" />
    <header>
      <div class="bg-header"></div>
      <img
        src="https://t7.baidu.com/it/u=4036010509,3445021118&fm=193&f=GIF"
        alt=""
      />
      <div class="id-img">
        <div class="phone">{{ $t("昨日收益：") }}{{ userInfo.toDayBound }}</div>
        <div>{{ $t("预期收益：") }}{{ userInfo.expectedReturn }}</div>
      </div>
    </header>
    <main>
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
            <div class="item-box">
              <div class="item-header">
                <img :src="imgHeader" alt="" />
                <div class="quxshitime">
                  {{ $t("创建时间") }}：{{
                    item.createTime | _timeFormat("MM-DD-YYYY")
                  }}
                </div>
                <div>
                  {{ $t("到期时间") }}：{{
                    item.endTime | _timeFormat("MM-DD-YYYY")
                  }}
                </div>
              </div>
              <div class="item-content">
                <img :src="item.img" alt="" />

                <div>
                  <div class="h3">基金编号：{{ item.id }}</div>
                  <div class="content-sdf">
                    <div class="content">
                      <div class="mb">
                        买入价格：{{ item.amount | _toLocaleString(false) }}
                      </div>
                      <div>总收入：$180.00</div>
                    </div>
                    <div class="time">
                      <div class="mb">每日收入：612.00</div>
                      <div>积累收入：612.00</div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
          <!-- <div slot="finished"></div> -->
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script>
import { transactionRecord } from "@/api";
import { mapActions, mapGetters } from "vuex";
import refresh from "@/mixins/refresh";

export default {
  mixins: [refresh],

  computed: {
    ...mapGetters(["userInfo"]),
  },

  data() {
    return {
      active: 1,
      imgHeader: require("@/assets/5.png"),
    };
  },
  mounted() {
    this.getList();
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await transactionRecord({
        type: 6,
      });
      this.loading = false;
      if (isRefreshing) {
        this.refreshing = false;
      }
      try {
        if (res.status === 0) {
          if (pageNum !== 1) {
            this.data = [...this.data, ...res.data.list];
          } else {
            this.data = res.data.list;
          }
        }
        // if (this.data.length >= res.data.total) {
        this.finished = true;
        // }
      } catch (error) {
        this.finished = true;
      }
    },

    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  padding-top: 23px;
}
.item-box {
  margin: 0 auto 15px;
  width: 720px;
  background: #ffffff;
  border-radius: 22px 22px 22px 22px;
  box-shadow: -10px 0px 17px 1.5px rgba(20, 7, 0, 0.1);
  padding-bottom: 50px;
  background-image: url("@/assets/₹ (1).png");
  background-repeat: no-repeat;
  background-position: right 61px bottom -10px;
  .item-header {
    height: 63px;
    width: 100%;
    background-image: url("@/assets/定制横.png");
    background-repeat: no-repeat;
    background-size: contain;
    margin-bottom: 50px;
    display: flex;
    font-size: 20px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: 400;
    text-align: center;
    color: #333333;
    line-height: 12px;
    letter-spacing: 1px;
    align-items: center;
    .quxshitime {
      margin-right: 87px;
    }
    img {
      width: 41px;
      height: 41px;
      margin-left: 28px;
      margin-right: 70px;
    }
  }
  .item-content {
    .h3 {
      font-size: 32px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: normal;
      text-align: left;
      color: #333333;
    }
    img {
      width: 124px;
      height: 124px;
      margin-left: 58px;
      margin-right: 22px;
    }
    display: flex;
    align-items: center;

    padding-right: 40px;
    .content-sdf {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .content {
    flex: 1;
    font-size: 26px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: normal;
    text-align: left;
    color: #999999;

    .mb {
      margin-top: 22px;
      margin-bottom: 18px;
    }
    line-height: 24px;
  }
  .time {
    margin-left: 20px;
    .mb {
      margin-top: 22px;
      margin-bottom: 18px;
    }
    font-size: 26px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: bold;
    text-align: left;
    color: #ffb188;
    line-height: 24px;
  }
}
header {
  width: 100vw;
  height: 255px;
  font-size: 16px;
  font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

  font-weight: normal;
  text-align: left;
  color: #333333;
  line-height: 10px;
  background-image: url("@/assets/₹.png");
  background-repeat: no-repeat;
  background-position: right 50px top;
  background-color: #ecfafc;
  display: flex;
  padding-left: 84px;
  padding-top: 24px;
  position: relative;
  .bg-header {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("@/assets/波浪 拷贝.png");
    background-repeat: no-repeat;
    background-position: bottom left;
    background-size: 100% 100%;
  }
  .id-img {
    font-size: 24px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 20px;
    .phone {
      // font-size: 32px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: normal;
      text-align: left;
      color: #333333;
      line-height: 32px;
      margin-bottom: 27px;
    }
  }
  img {
    width: 94px;
    height: 94px;
    border-radius: 50%;
    margin-right: 36px;
  }
}

::v-deep .van-nav-bar__content {
  background-color: #ecfafc;
}
.box-tabs {
  padding: 0 40px;

  width: 100%;
  z-index: 100;

  :deep(.van-tabs__wrap) {
    border-radius: 40px;
    height: 88px;
    box-shadow: -10px 0px 17px 1.5px rgba(20, 7, 0, 0.1);

    .van-tab {
      font-size: 30px;
      color: #999999;

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
</style>