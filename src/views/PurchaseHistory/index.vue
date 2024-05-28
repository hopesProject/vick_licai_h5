<template>
  <div class="page">
    <van-nav-bar :title="$t('购买记录')" left-arrow @click-left="onClickLeft" />

    <header>
      <div class="header-box">
        <div class="tiele-box">
          <div>{{ $t("总收益") }}</div>
          <svg-icon style="margin-left: 10px" iconClass="yj"></svg-icon>
        </div>
        <div class="text-box">{{ 11111 | _toLocaleString(false) }}</div>
      </div>
      <div class="flex shoyi-box">
        <div class="">
          <div class="flex items-center">
            <svg-icon
              style="margin-right: 10px"
              iconClass="Frame7"
              class="frame"
            >
            </svg-icon>
            <span> {{ $t("已领取收益") }}</span>
          </div>
          <div class="text-sl">₹284.00</div>
        </div>
        <div>
          <div class="flex items-center">
            <svg-icon
              style="margin-right: 10px"
              iconClass="Frame7"
              class="frame"
            >
            </svg-icon>
            <span>{{ $t("未来收益") }}</span>
          </div>
          <div class="text-sl">₹284.00</div>
        </div>
      </div>
    </header>
    <main>
      <!-- <Progress :current="49" :total="50"></Progress> -->
      <van-tabs v-model="active" class="box-tabs" line-height="0">
        <van-tab :title="$t('进行中', { count: 1 })" :name="0"></van-tab>
        <van-tab :title="$t('已完成', { count: 1 })" :name="1"></van-tab>
      </van-tabs>
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
              <van-row>
                <van-col span="12" style="text-align: left">
                  <p class="title">理财产品1</p>
                  <p>Investment</p>
                  <p class="amount-p">₹7834.23</p>
                  <p>Growth period</p>
                  <p class="amount-p">₹7834.23</p>
                </van-col>
                <van-col span="12" style="text-align: right">
                  <p class="status">进行中</p>
                  <p>Daily returns</p>
                  <p class="amount-p">₹7834.23</p>
                  <p>Total returns</p>
                  <p class="amount-p">₹7834.23</p>
                </van-col>
              </van-row>
              <div class="ddjd">
                {{ $t("订单进度") }}
              </div>
              <Progress :current="5" :total="30"></Progress>
              <van-row>
                <van-col span="12" style="text-align: left">
                  <p class="butoon-box">{{ $t("购买时间") }}</p>
                  <p class="butoon-box">{{ $t("到期时间") }}</p>
                  <p class="butoon-box">{{ $t("当前累计收入") }}</p>
                </van-col>
                <van-col span="12" style="text-align: right">
                  <p class="butoon-box">2024/02/02</p>
                  <p class="butoon-box">2024/02/02</p>
                  <p class="amount-p amount-butoon">₹7834.23</p>
                </van-col>
              </van-row>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script>
import { productRecord } from "@/api";
import { mapGetters } from "vuex";
import refresh from "@/mixins/refresh";
import Progress from "@/components/Progress";
export default {
  mixins: [refresh],
  components: { Progress },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    active() {
      this.pageNum = 1;
      this.getList();
    },
  },
  data() {
    return {
      active: 1,
      data: [{}],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await productRecord({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        isComplete: this.active,
      });
      if (isRefreshing) {
        this.refreshing = false;
      }
      this.loading = false;
      try {
        if (res?.status === 0) {
          if (pageNum !== 1) {
            // this.data = [...this.data, ...res.data.list];
          } else {
            // this.data = res.data.list;
          }
        }
        // if (this.data.length >= res.data.total) {
        this.finished = true;
        // }
      } catch (error) {
        console.log(error);
      }
      this.finished = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
}
.item-box {
  padding: 18px 25px;
  margin: 0 auto 10px;
  width: 690px;
  border-radius: 32px;
  opacity: 1;
  background: #ffffff;
  box-shadow: 0px 12.55px 56.45px 0px rgba(0, 0, 0, 0.1);
  font-variation-settings: "opsz" auto;
  font-size: 24px;
  font-weight: normal;
  line-height: 30px;
  letter-spacing: 0.6px;
  color: #818197;
  .butoon-box {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;

    letter-spacing: 0.6px;
    color: #666666;
    margin-top: 23px;
  }
  .amount-butoon {
    margin-top: 23px;
  }
  .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    color: #3d3d3d;
    margin-bottom: 17px;
  }
  .status {
    font-size: 24px;
    font-weight: 500;
    color: #ff752f;
    margin-bottom: 17px;
  }
  .amount-p {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0.6px;
    color: #d35a18;
    margin-bottom: 12px;
  }
  .ddjd {
    padding-top: 24px;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0.6px;

    color: #3d3d3d;
    margin-bottom: 24px;
  }
}
header {
  height: 255px;
  height: 402px;
  border-radius: 32px;
  opacity: 1;
  background: linear-gradient(276deg, #f44848 2%, #ff782d 102%);
  margin: 25px 30px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .shoyi-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 500;
    line-height: 44px;
    letter-spacing: -1.6px;

    font-variation-settings: "opsz" auto;
    color: #ffffff;
    .text-sl {
      font-size: 40px;
      font-weight: 600;
      line-height: 56px;
      letter-spacing: 0em;
      margin-top: 12px;
    }
    .frame {
      font-size: 48px;
    }
  }
  .text-box {
    font-size: 60px;
    font-weight: bold;
    line-height: 84px;
    letter-spacing: -3px;
    color: #ffffff;
  }
  .tiele-box {
    display: flex;
    align-items: center;
    font-size: 32px;
    line-height: 44px;
    letter-spacing: -0.64px;
    color: #ffffff;
    z-index: 0;
    margin-bottom: 10px;
  }
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
      font-size: 24px;
      color: #ff752f;

      .van-tab__text {
        height: 80px;
        line-height: 80px;
      }
    }

    .van-tab--active {
      background: linear-gradient(272deg, #f44848 0%, #ff782d 103%);
      border-radius: 40px;
      color: #ffffff;
    }
  }
}

:deep(.van-cell) {
  background-color: transparent;
}
</style>