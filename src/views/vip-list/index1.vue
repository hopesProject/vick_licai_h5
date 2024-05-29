<template>
  <div class="vip-warp">
    <come-back />
    <header>{{ $t("VIP等级") }}</header>
    <div class="ifyao"># {{ $t("VIP升级条件") }} #</div>
    <div class="content-warp">
      <van-row>
        <van-col span="8">- {{ $t("VIP等级") }} </van-col>
        <van-col span="8">{{ $t("成长值") }}</van-col>
        <van-col span="8">{{ $t("距离升级") }} -</van-col>
      </van-row>
      <van-row
        class="data-item"
        type="flex"
        justify="center"
        align="center"
        v-for="item in data"
        :key="item.id"
      >
        <van-col span="8" class="relative">
          <img :src="item.img" alt="" />
          <div class="relatives">{{ item.level }}</div>
        </van-col>
        <van-col span="8">{{ item.amount }}</van-col>
        <van-col span="8" class="right-text">
          <van-progress
            :percentage="
              (userInfo.sumBuyAmount / item.amount) * 100 >= 100
                ? 100
                : (userInfo.sumBuyAmount / item.amount) * 100
            "
          />
          <div class="trest">
            {{
              (userInfo.sumBuyAmount / item.amount) * 100 >= 100
                ? $t("已达成")
                : $t("未达成")
            }}
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="illustrate">
      <div class="header-box">{{ $t("等级说明") }}</div>
      <div class="text">
        <p>
          Upgrade to VIP and enjoy unparalleled benefits! The higher your VIP
          level, the more rewards and privileges you will receive. Priority
          service, exclusive offers, and generous rewards make your experience
          even more outstanding. Take action now and embark on a VIP exclusive
          journey!
        </p>
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
      data: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await getLevelSetting();
      if (res.status === 0) {
        this.data = res.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.vip-warp {
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/vip-bg.png");
  background-size: 100%;
  background-repeat: no-repeat;

  .illustrate {
    width: 686px;
    min-height: 100px;
    background: rgba(253, 208, 197, 0.6);
    border-radius: 40px;
    margin: 0 auto;
    margin-top: 24px;
    font-size: 34px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: normal;
    text-align: left;
    color: #ffffff;
    line-height: 34px;
    padding: 50px;

    .header-box {
      font-size: 34px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: normal;
      color: #ffffff;
      line-height: 34px;
      margin-bottom: 22px;
      text-align: center;
    }

    .text {
      font-size: 26px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: bold;
      text-align: left;
      color: #ffffff;
      letter-spacing: 4.68px;
    }
  }

  .content-warp {
    width: 686px;
    background: rgba(253, 208, 197, 0.6);
    border-radius: 40px;
    margin: 0 auto;
    margin-top: 24px;
    font-size: 34px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: normal;
    text-align: left;
    color: #ffffff;
    line-height: 34px;

    padding: 47px 33px 91px;

    .data-item {
      margin-top: 20px;
      background: #ffffff;
      border-radius: 40px;
      box-shadow: -10px 0px 17px 1.5px rgba(20, 7, 0, 0.1);
      font-size: 33px;
      font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

      font-weight: 400;
      text-align: left;
      color: #222222;
      line-height: 33px;
      padding: 40px 60px;
      margin-bottom: 6px;

      .right-text {
        font-size: 26px;
        font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

        font-weight: 400;
        text-align: left;
        color: #ff977c;
        line-height: 33px;

        .trest {
          text-align: center;
          margin-top: 14px;
        }
      }

      .relatives {
        position: absolute;
        top: 40px;
        left: 45px;
        font-size: 19px;
        font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

        font-weight: bold;
        text-align: left;
        color: #ffffff;
        line-height: 19px;
      }

      img {
        width: 67px;
        height: 67px;
      }
    }
  }

  header {
    font-size: 145px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: bold;
    text-align: center;
    color: #fefefe;
    letter-spacing: 1.45px;
    text-shadow: 7.07px 7.07px 5px 10px rgba(25, 92, 190, 0.54);
    margin-bottom: 26px;
  }

  .ifyao {
    margin: 0 auto;
    width: 496px;
    line-height: 53px;
    background: #ffffff;
    border-radius: 27px;
    font-size: 30px;
    font-family: "Varela Round", sans-serif, sans-serif, Georgia, serif !important;

    font-weight: normal;
    text-align: center;
    color: #fc8c70;
    letter-spacing: 2.25px;
  }
}

::v-deep .van-progress {
  height: 25px;
  border-radius: 17px;
}

::v-deep .van-progress__portion {
  background: #ff957c;
}

::v-deep .van-progress__pivot {
  display: none;
}
</style>