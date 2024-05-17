<template>
  <div>
    <van-nav-bar :title="$t('购买记录')" left-arrow @click-left="onClickLeft" />

    <header>
      <div class="bg-header"></div>
      <img
        src="https://t7.baidu.com/it/u=4036010509,3445021118&fm=193&f=GIF"
        alt=""
      />
      <div class="id-img">
        <div class="phone">{{ userInfo.phone | _phoneSubstring }}</div>
        <div>{{ $t("ID账号：") }}{{ userInfo.code }}</div>
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
              <img :src="item.img" alt="" />
              <div class="content">
                <div class="mb">
                  {{ $t("商品名称：") }}{{ item.productTitle }}
                </div>
                <div>{{ $t("购买金额：") }}{{ item.price * item.num }}</div>
              </div>
              <div class="time">
                <div>
                  {{ $t("购买时间：")
                  }}<span>
                    {{ item.createTime | _timeFormat("YYYY-MM-DD") }}
                  </span>
                </div>
                <div>
                  {{ $t("到期时间：")
                  }}<span> {{ item.endTime | _timeFormat("YYYY-MM-DD") }}</span>
                </div>
                <div></div>
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
import { productRecord } from "@/api";
import { mapGetters } from "vuex";
import refresh from "@/mixins/refresh";

export default {
  mixins: [refresh],
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      data: [],
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    async getList(isRefreshing) {
      let pageNum = this.pageNum;
      const res = await productRecord();
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
      } catch (error) {}
      this.finished = true;
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
  margin: 0 auto 10px;
  width: 720px;
  height: 200px;
  background: #ffffff;
  border-radius: 100px;
  box-shadow: -10px 0px 17px 1.5px rgba(20, 7, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url("@/assets/₹ (1).png");
  background-repeat: no-repeat;
  background-position: right 61px top 50%;
  padding-right: 40px;
  img {
    width: 124px;
    height: 124px;
    margin-left: 58px;
    margin-right: 22px;
  }
  .content {
    flex: 1;
    font-size: 24px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: normal;
    text-align: left;
    color: #333333;
    .mb {
      margin-bottom: 18px;
    }
    line-height: 24px;
  }
  .time {
    font-size: 20px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: normal;
    text-align: left;
    color: #666666;
    line-height: 41px;
    span {
      color: #ffb19f;
    }
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
  }
  .id-img {
    font-size: 24px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 20px;
    .phone {
      font-size: 32px;
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
</style>