<template>
  <div class="wrapper">
    <div class="titile">
      <HeaderBox />
      <header>
        <van-image
          round
          class="image-img"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="name">{{ $t("用户名") }}</div>
      </header>
    </div>
    <main>
      <div class="psoi-box">
        <div
          class="psoi"
          style="border-bottom: 1px dashed rgba(255, 255, 255, 0.6)"
        >
          <div class="dispasdj">
            <span class="text-posi">{{ $t("邀请链接：") }}</span>
            <span class="underlines">
              {{ invitationCodetext }}
            </span>
          </div>

          <span
            style="margin-left: 20px"
            class="fz"
            v-clipboard:copy="invitationCode"
            v-clipboard:success="onCopy"
            >{{ $t("复制") }}
          </span>
        </div>
        <div class="psoibottun">
          <van-notice-bar :text="noticeTexe" />
          <!-- <van-swipe class="swipe-box" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in earningsData" :key="item.id">
              <div class="bonus-button-txt">
                {{
                  $t("恭喜用户领取奖金", {
                    phone: $utils.maskPhoneNumber(item.phone),
                    amount: item.amount,
                  })
                }}
              </div>
            </van-swipe-item>
          </van-swipe> -->
        </div>
      </div>
      <div class="bonus">
        <div class="top-box">
          <div class="bonus-title">{{ $t("累计奖金") }}</div>
          <div class="bonus-num">
            <div>
              {{ taskPageData.accumulatedBonus | _toLocaleString(false) }}
            </div>
          </div>
        </div>

        <div class="button-box">
          <div class="bonus-income">
            <div>{{ $t("可领取") }}</div>
            <div>{{ taskPageData.bounds | _toLocaleString(false) }}</div>
          </div>
          <van-button
            @click="getEarnings"
            class="bonus-button"
            type="primary"
            block
            color="#FF5148"
            :loading="getEarningsLoding"
          >
            {{ $t("领取收益") }}
          </van-button>
        </div>
      </div>
      <div class="grade">
        <div class="grade-title">
          {{ $t("收益等级") }}
        </div>

        <div
          v-for="item in leverList"
          :key="item.laber"
          class="grade-list"
          @click="$router.push('/team')"
        >
          <div class="grade-list-img">
            <svg-icon
              class="font-svg"
              style="margin-left: 10px"
              :iconClass="item.icon"
            />
            <p>
              {{ item.laber }}
            </p>
          </div>
          <div class="count-box">
            <div class="count-text">{{ $t("成员规模") }}</div>
            <div class="count-num">
              {{ item.count }}
            </div>
          </div>
          <div class="count-box">
            <div class="count-text">{{ $t("有效人数") }}</div>
            <div class="count-num">
              {{ item.vipCount }}
            </div>
          </div>

          <div class="xq">{{ $t("查看详情") }}</div>
        </div>

        <div class="sygz">{{ $t("收益规则") }}</div>
      </div>
      <div class="prompt">
        <div class="prompt-header">{{ $t("今日数据") }}</div>
        <van-row>
          <van-col span="8">
            <div class="shul">{{ taskPageData.dayRegCount }}</div>
            <div class="cygm">{{ $t("成员规模") }}</div>
          </van-col>
          <van-col span="8">
            <div class="shul">{{ taskPageData.dayRegActiveCount }}</div>
            <div class="cygm">{{ $t("有效人群") }}</div>
          </van-col>
          <van-col span="8">
            <div class="shul">{{ taskPageData.dayTeamBound }}</div>
            <div class="cygm">{{ $t("团队收益") }}</div>
          </van-col>
        </van-row>
      </div>
    </main>
  </div>
</template>
<script>
import { getEarnings, taskPage, transactionGetEarnings } from "@/api";
import { mapGetters } from "vuex";
import clipboard2 from "@/mixins/clipboard2";
import HeaderBox from "@/components/header";
import { Toast } from "vant";

export default {
  mixins: [clipboard2],
  components: { HeaderBox },
  computed: {
    ...mapGetters(["userInfo"]),
    noticeTexe() {
      let str = "";
      this.earningsData.map((item) => {
        str +=
          this.$t("恭喜用户领取奖金", {
            phone: this.$utils.maskPhoneNumber(item.phone),
            amount: item.amount,
          }) + "                                 ";
      });
      return str;
    },
    invitationCode() {
      return `${window.location.origin}/#/register?code=${this.userInfo.invitationCode}`;
    },
    invitationCodetext() {
      let str = `${window.location.origin}/#/register?code=${this.userInfo.invitationCode}`;
      let result = str.substring(0, 15) + "***" + str.substring(str.length - 6);
      return result;
    },

    leverList() {
      return [
        {
          laber: "Level 1",
          count: this.taskPageData.fristCount,
          vipCount: this.taskPageData.fristVipCount,
          icon: "dj1",
        },
        {
          laber: "Level 2",
          count: this.taskPageData.twoCount,
          vipCount: this.taskPageData.twoVipCount,
          icon: "dj2",
        },
        {
          laber: "Level 3",
          count: this.taskPageData.thereCount,
          vipCount: this.taskPageData.thereVipCount,
          icon: "dj3",
        },
      ];
    },
  },
  data() {
    return {
      fanhui: require("@/assets/fanhui.png"),
      taskPageData: {},
      getEarningsLoding: false,
      earningsData: [],
    };
  },
  mounted() {
    this.transactionGetEarnings();
    this.getData();
    // this.generateQRCode();
  },
  methods: {
    async transactionGetEarnings() {
      try {
        const res = await transactionGetEarnings();
        this.earningsData = res.data;
      } catch (error) {}
    },
    async getEarnings() {
      if (!this.taskPageData.bounds) {
        return Toast.success(this.$t(`购买成功`));
      }
      this.getEarningsLoding = true;
      try {
        const res = await getEarnings();
        if (res.status === 0) {
          Toast.success(this.$t("领取成功"));
          this.getData();
        }
      } catch (error) {}
      this.getEarningsLoding = false;
    },

    async getData() {
      const res = await taskPage();
      if (res.status === 0) {
        this.taskPageData = res.data;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.dispasdj {
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  width: 550px;
}
.wrapper {
  width: 100vw;
  min-height: 100vh;
  .titile {
    background-image: url("@/assets/img/invite-bg.png");
    background-size: 100%;
    .header {
      background-color: transparent !important;
    }
    padding-bottom: 70px;
  }
  header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: 600;
    line-height: 42px;
    text-align: center;
    letter-spacing: 0px;

    font-variation-settings: "opsz" auto;
    color: #ffffff;
    .image-img {
      width: 160px;
      height: 160px;
      margin-bottom: 12px;
    }
  }
  main {
    margin-top: -16px;
    padding: 0 0 70px 0;
    background: #f6f6f6;

    min-height: 200px;
    width: 100%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

    .prompt {
      width: 690px;
      height: 278px;
      border-radius: 16px;
      opacity: 1;
      font-size: 32px;
      font-weight: 500;
      line-height: 32px;
      letter-spacing: 0.6px;
      text-align: center;
      color: #3d3d3d;
      background: #ffffff;
      margin: 24px auto;
      overflow: hidden;
      .prompt-header {
        margin: 48px 0 38px;
      }
      .shul {
        font-size: 44px;
        font-weight: 600;
        line-height: 72px;
        text-align: center;
        letter-spacing: 0.6px;

        font-variation-settings: "opsz" auto;
        color: #3d3d3d;
      }
      .cygm {
        font-size: 22px;
        font-weight: 500;
        line-height: 32px;
        letter-spacing: 0.6px;
        margin-top: 18px;
        color: #3d3d3d;
      }
    }
  }
}

.fanhui {
  position: fixed;
  top: 47px;
  left: 54px;
  width: 18px;
  height: 32px;
  z-index: 99;
}

.psoi-box {
  // background: rgba(205, 85, 51, 0.12);
  margin: 0 35px;
  text-align: center;
  border-radius: 32px;
  font-size: 26px;
  font-weight: 600;
  line-height: 42px;
  text-align: center;
  letter-spacing: 0px;
  font-variation-settings: "opsz" auto;
  color: #3d3d3d;
  overflow: hidden;
  box-shadow: 0px 4px 27px 0px rgba(0, 0, 0, 0.1);
}
.psoi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding: 0px 24px;
  height: 112px;
  font-size: 26px;
  font-weight: 500;
  line-height: 42px;
  letter-spacing: 0px;
  font-variation-settings: "opsz" auto;
  color: #d25815;
  .text-posi {
    // width: 180px;
    font-size: 26px;
    font-weight: 600;
    line-height: 42px;
    text-align: center;
    letter-spacing: 0px;

    font-variation-settings: "opsz" auto;
    color: #3d3d3d;
  }
  .underlines {
    display: inline-block;
    width: 500px;
    text-decoration: underline;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 26px;
    font-weight: 500;
    line-height: 42px;
    letter-spacing: 0px;
    font-variation-settings: "opsz" auto;
    color: #d25815;
  }
  .fz {
    width: 108px;
    height: 60px;
    border-radius: 16px;
    opacity: 1;

    background: #d35a18;
    font-size: 24px;
    font-weight: 500;
    line-height: 60px;
    text-align: center;
    letter-spacing: 0px;

    font-variation-settings: "opsz" auto;
    color: #ffffff;
  }
}

.psoibottun {
  background: #ffbc96;
  .swipe-box {
    height: 112px;
  }
  .bonus-button-txt {
    width: 622px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 32px;
    font-weight: 500;
    line-height: 112px;
    letter-spacing: 0.6px;
    color: #3f3f65;
  }
}

.bonus {
  height: 637px;
  background-image: url("@/assets/Rectangle@1x.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .top-box {
    margin-top: 80px;
    .bonus-title {
      font-size: 30px;
      font-weight: 500;
      line-height: 40px;
      letter-spacing: 0.6px;

      font-variation-settings: "opsz" auto;
      color: #2c2c63;
    }

    .bonus-num {
      font-size: 44px;
      font-weight: 600;
      line-height: 72px;
      text-align: center;
      letter-spacing: 0.6px;
      margin-top: 24px;
      font-variation-settings: "opsz" auto;
      color: #3d3d3d;
    }
  }

  .button-box {
    .bonus-income {
      padding-top: 50px;
      text-align: center;

      > div:nth-child(1) {
        font-size: 30px;
        letter-spacing: 0.6px;

        font-variation-settings: "opsz" auto;
        color: #2c2c63;
      }

      > div:nth-child(2) {
        margin-top: 24px;
        font-size: 44px;
        font-weight: 600;
        line-height: 72px;
        text-align: center;
        letter-spacing: 0.6px;

        font-variation-settings: "opsz" auto;
        color: #3d3d3d;
      }
    }

    .bonus-button {
      width: 610px;
      height: 100px;
      border-radius: 30px;
      opacity: 1;
      margin-bottom: 80px;
      background: #ffffff;
      margin-top: 48px;
      box-sizing: border-box;
      border: 2px solid #e7e7f6;
      color: #3d3d3d;

      .bonus-button-txt {
        font-size: 36px;
        font-weight: 600;
        line-height: 26px;
        letter-spacing: 1px;
      }
    }
  }
}

.title {
  width: 640px;
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.32);
  border-radius: 26px;
  box-shadow: -1px 0px 1px 1px #ffffff inset;
  position: absolute;
  top: 90px;

  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div {
    color: #fff;
    text-shadow: 0.33px 0.95px 0px 0.55px #eb6941 inset;
    font-size: 45px;
    text-align: center;
    line-height: 60px;
  }
}

.invite-bg {
  // position: relative;

  .invite-bg-img {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.grade {
  width: 690px;
  // height: 776px;
  border-radius: 16px;
  opacity: 1;
  background: #ffffff;
  box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 48px 30px 24px;
  .sygz {
    font-size: 24px;
    font-weight: normal;
    line-height: 32px;
    letter-spacing: 0.6px;
    font-variation-settings: "opsz" auto;
    color: #3d3d3d;
    text-align: center;
    padding-top: 10px;
  }
  .grade-title {
    font-size: 36px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0.6px;
    text-align: center;
    color: #3d3d3d;

    margin-bottom: 36px;
  }

  .grade-row {
    font-size: 24px;
    color: #4d2101;
    padding: 20px 0 0 0;
    display: flex;
    align-items: center;
  }

  .grade-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    width: 630px;
    height: 168px;
    border-radius: 40px;
    opacity: 1;
    margin-bottom: 16px;
    border: 2px solid #ff8700;

    .xq {
      width: 100px;
      font-size: 28px;
      font-weight: normal;
      line-height: 32px;
      letter-spacing: 0.6px;
      text-align: center;
      font-variation-settings: "opsz" auto;
      color: #ff8700;
    }
    .count-box {
      width: 150px;
      font-size: 28px;
      font-weight: normal;
      line-height: 32px;
      letter-spacing: 0.6px;
      text-align: center;
      font-variation-settings: "opsz" auto;
      color: #3d3d3d;
      .count-num {
        margin-top: 10px;
        font-size: 28px;
        font-weight: 500;
        color: #d35a18;
      }
    }
    .grade-list-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 28px;
      font-weight: 500;
      line-height: 32px;
      letter-spacing: 0.6px;
      font-weight: 600;
      color: #3d3d3d;
      .font-svg {
        margin-bottom: 10px;
        font-size: 66px;
        margin-right: 18px;
      }
    }
  }
}

:deep(.van-swipe__indicators--vertical) {
  display: none;
}

:deep(.van-notice-bar) {
  width: 100%;
  background-color: transparent;
  color: #3f3f65;

  .van-notice-bar__content {
    white-space: pre;
  }
}
</style>