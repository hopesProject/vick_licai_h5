<template>
  <div class="wrapper">
    <van-nav-bar title="VIP" :border="false" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="content">
      <div class="content-img">
        <img src="@/assets/img/vip-grade.png" alt="" />
      </div>
      <div class="content-box">
        <div class="box-title">{{ $t("VIP升级条件") }}</div>
        <div class="box-list" v-for="(item, i) in list" :key="i">
          <img src="@/assets/img/commission-icon3.png" alt="" />
          <div class="list-name">{{ item.level }}</div>
          <div class="list-txt">
            <span>{{ $t("成长值") }}</span><span>{{ item.amount }}</span>
          </div>
          <div class="list-progress">
            <span>
              {{
                (userInfo.sumBuyAmount / item.amount) * 100 >= 100
                  ? $t("已达成")
                  : $t("未达成")
              }}</span>
            <van-progress :percentage="(userInfo.sumBuyAmount / item.amount) * 100 >= 100
                ? 100
                : ((userInfo.sumBuyAmount / item.amount) * 100)
              " :pivot-text="userInfo.sumBuyAmount ? userInfo.sumBuyAmount : ''" stroke-width="18" track-color="#F0F0F0"
              color="linear-gradient(90deg, #FF8700 0%, #FF6200 117%)" />
          </div>
        </div>
      </div>
      <div class="illustrate">
        <div class="illustrate-title">{{ $t("充值说明") }}</div>
        <!-- <pre class="illustrate-txt">
                1·当你正确完成付款，资金会在20分您得到的账户当中
                2·当你正确完成付款，资金会在20分钟到达您得到的账户
                3·当你正确完成付款，资金会在20分钟到达您得到的账</pre
        > -->
        <div v-html="contentTxt" class="illustrate-txt"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLevelSetting } from "@/api";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      touxiang: require("@/assets/touxiangvip.png"),
      list: [],
      contentTxt:'<p> 1·当你正确完成付款，资金会在20分您得到的账户当中</p><p>2·当你正确完成付款，资金会在20分钟到达您得到的账户 </p><p>3·当你正确完成付款，资金会在20分钟到达您得到的账</p>'
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await getLevelSetting();
      if (res.status === 0) {
        this.list = res.data;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  background-color: #f8f3f2;
  background-image: url("@/assets/img/vip-bg.png");
  background-size: 100% 100%;
  overflow: auto;

  .van-nav-bar {
    background-color: transparent;

    :deep(.van-nav-bar__title) {
      color: #fff;
    }
  }
}

.content {
  margin: 16px;
}

.content-img {
  margin-top: 80px;
  width: 360px;
  height: 230px;

  >img {
    width: 100%;
    height: 100%;
  }
}

.content-box {
  border-radius: 16px;
  background: #ffffff;
  padding: 36px 34px;
  box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.1);

  .box-title {
    font-size: 32px;
    color: #3d3d3d;
    text-align: center;
  }

  .box-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    color: #3d3d3d;
    border-radius: 40px;
    border: 2px solid #ff8700;
    padding: 48px 36px;
    margin-top: 32px;

    >img {
      width: 72px;
      height: 72px;
      border-radius: 24px;
    }

    .list-name {
      font-size: 32px;
      padding-right: 16px;
      font-weight: 600;
    }

    .list-txt {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      >span:nth-child(1) {
        padding-bottom: 12px;
      }
    }

    .list-progress {
      display: flex;
      flex-direction: column;
      align-items: center;

      .van-progress {
        margin-top: 16px;
        width: 220px;
        border-radius: 40px;

        :deep(.van-progress__pivot) {
          font-size: 18px;
          background: transparent !important;
          color: #000;
        }
      }
    }
  }
}

.illustrate {
  margin: 36px 0;
  font-weight: 600;

  .illustrate-title {
    font-size: 36px;
    color: #ffffff;
    text-align: center;
    margin-bottom: 18px;
  }

  .illustrate-txt {
    font-size: 24px;
    line-height: 42px;
    color: #f6f6f6;
    margin: 0 auto;
    word-break: break-all;
    overflow-wrap: break-word;
    padding-bottom: 16px;

    p {
      word-break: break-all;
      overflow-wrap: break-word;
    }
  }
}
</style>