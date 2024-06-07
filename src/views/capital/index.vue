<template>
  <div class="wrapper">
    <van-nav-bar :title="$t('资金详情')" left-arrow @click-left="onClickLeft" />
    <div class="header-box">
      <div class="dropdown-box">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="option" />
        </van-dropdown-menu>
      </div>
    </div>

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
              <div class="flex items-center">
                <svg-icon
                  class="font-svg"
                  style="margin-left: 10px"
                  :iconClass="statusTypeColor(item.type)"
                />
                <div>
                  <p :class="statusTypeColor(item.type)">
                    {{ item.amount }}
                  </p>
                  <p class="p-time">{{ item.createTime }}</p>
                </div>
              </div>
              <div class="tx" :class="statusTypeColor(item.type)">
                {{ statusType(item.type) }}
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>
<script>
import { transactionRecord } from "@/api";
import refresh from "@/mixins/refresh";
import { mapGetters } from "vuex";
export default {
  mixins: [refresh],
  computed: {
    ...mapGetters(["userInfo"]),
    option() {
      return [
        { text: this.$t("全部"), value: 0 },
        { text: this.$t("充值"), value: 1 },
        { text: this.$t("提现"), value: 2 },
        { text: this.$t("购买"), value: 3 },
        { text: this.$t("奖励"), value: 4 },
        { text: this.$t("分润"), value: 5 },
        { text: this.$t("收益"), value: 6 },
      ];
    },
  },

  data() {
    return {
      data: [],
      value: 0,
    };
  },
  watch: {
    value(v) {
      this.data = [];
      this.pageNum = 1;
      this.getList();
    },
  },
  created() {
    this.getList();
  },
  methods: {
    statusTypeColor(val) {
      if (
        val === "1" ||
        val === "4" ||
        val === "5" ||
        val === "6" ||
        val === "7" ||
        val === "8"
      ) {
        return "arrowdown";
      } else {
        return "arrowdown1";
      }
    },
    statusType(val) {
      switch (val) {
        case "1":
          return this.$t("充值");
        case "2":
          return this.$t("提现");
        case "3":
          return this.$t("购买");
        case "4":
          return this.$t("奖励");
        case "5":
          return this.$t("分润");
        case "6":
          return this.$t("收益");
        case "7":
          return this.$t("收益");
        case "8":
          return this.$t("收益");
        default:
          break;
      }
    },
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await transactionRecord({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        type: this.value,
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
        if (this.data.length >= res.data.total) {
          this.finished = true;
        }
      } catch (error) {
        this.finished = true;
      }
    },
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
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}
.header-box {
  width: 100%;
  background-color: #fff;
  .dropdown-box {
    width: 50%;
  }
}
:deep(.van-dropdown-menu__bar) {
  box-shadow: none;
  .van-dropdown-menu__title {
    padding: 0 37px;
  }
  .van-dropdown-menu__item {
    justify-content: flex-start;
  }
}
:deep(.van-dropdown-menu) {
  .van-cell {
    font-size: 36px;
    font-weight: 600;
    line-height: normal;

    letter-spacing: 2px;
    font-variation-settings: "opsz" auto;
    color: #666666;
  }
}

.item-box {
  font-size: 36px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.76px;
  font-variation-settings: "opsz" auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #3bb64f;
  .font-svg {
    font-size: 48px;
    margin-right: 24px;
  }
  .p-time {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin-top: 8px;
    letter-spacing: 0.6px;

    font-variation-settings: "opsz" auto;
    color: #666666;
  }

  .arrowdown {
    color: #3bb64f;
  }
  .arrowdown1 {
    color: #ff752f;
  }
  .tx {
    font-size: 36px;
    font-weight: 600;
    line-height: normal;
  }
}
main {
  background: #f6f6f6;
}
:deep(main) {
  .van-cell {
    background-color: #f6f6f6;
  }
  .van-cell::after {
    border-color: #d8d8d8;
  }
}
</style>