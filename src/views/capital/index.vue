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
          <van-cell v-for="(item, index) in data" :key="item.id">
            <div class="item-box">
              <div class="flex items-center">
                <svg-icon
                  class="font-svg"
                  style="margin-left: 10px"
                  :iconClass="index === 0 ? 'arrowdown' : 'arrowdown1'"
                />
                <div>
                  <p :class="`${index === 0 ? 'arrowdown' : 'arrowdown1'}`">
                    ₹ 12.35
                  </p>
                  <p class="p-time">02 / 02 / 2040</p>
                </div>
              </div>
              <div :class="`${index === 0 ? 'arrowdown tx' : 'arrowdown1 tx'}`">
                提现
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
import refresh from "@/mixins/refresh";
import { mapGetters } from "vuex";
export default {
  mixins: [refresh],
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      data: [{}, {}, {}],
      value: 0,
      option: [
        { text: "全部", value: 0 },
        { text: "分润", value: 1 },
        { text: "购买", value: 2 },
        { text: "奖励", value: 2 },
        { text: "提现", value: 2 },
      ],
    };
  },
  watch: {
    active(v) {
      this.getList();
    },
  },
  created() {
    // this.getList();
  },
  methods: {
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await transactionRecord({
        type: this.active === 0 ? "" : this.active,
      });
      this.loading = false;
      if (isRefreshing) {
        this.refreshing = false;
      }
      try {
        if (res.status === 0) {
          if (pageNum !== 1) {
            // this.data = [...this.data, ...res.data];
          } else {
            // this.data = res.data;
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