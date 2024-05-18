<template>
  <div class="wrapper">
    <img @click="$router.go(-1)" :src="fanhui" alt="" class="fanhui" />
    <div class="title">
      <div>{{ $t("邀请好友") }}</div>
      <div>{{ $t("收益多多益善") }}</div>
    </div>
    <div class="invite-bg" style="height: 150px">
      <img style="height: 200px" src="@/assets/invite-icon1.png" alt="" />
      <img
        style="height: 200px"
        class="invite-bg-img"
        src="@/assets/invite-icon2.png"
        alt=""
      />
    </div>
    <div class="bonus">
      <!-- <img src="@/assets/invite-icon3.png" alt=""> -->
      <div class="bonus-title">奖金</div>
      <div class="bonus-num">
        <div>₹ {{ taskPageData.accumulatedBonus }}</div>
        <div>累计奖金</div>
      </div>
      <div class="bonus-income">
        <div>奖金收益</div>
        <div>₹ {{ taskPageData.bounds }}</div>
      </div>
      <div class="bonus-button">
        <van-button type="primary" block color="#FF5148" :round="true"
          >立即领取</van-button
        >

        <van-swipe
          style="height: 20px"
          vertical
          :autoplay="3000"
          indicator-color="white"
        >
          <van-swipe-item
            ><div class="bonus-button-txt">
              恭喜1235***985用户领取500.00奖金
            </div></van-swipe-item
          >
          <van-swipe-item
            ><div class="bonus-button-txt">
              恭喜1235***985用户领取500.030奖金
            </div></van-swipe-item
          >
          <van-swipe-item
            ><div class="bonus-button-txt">
              恭喜1235***985用户领取500.040奖金
            </div></van-swipe-item
          >
          <van-swipe-item
            ><div class="bonus-button-txt">
              恭喜1235***985用户领取500.050奖金
            </div></van-swipe-item
          >
        </van-swipe>
      </div>
    </div>
    <div class="grade">
      <div class="grade-title">
        收益等级

        <svg-icon
          @click="$router.push('/share')"
          iconClass="a"
          class="grade-cion"
        ></svg-icon>
      </div>
      <van-row type="flex" justify="space-between" class="grade-row">
        <van-col span="8">等级</van-col>
        <van-col span="8">成员规模</van-col>
        <van-col span="8">有效人数</van-col>
      </van-row>
      <div class="grade-list" @click="$router.push('/team')">
        <div class="grade-list-img">1</div>
        <div>{{ taskPageData.fristCount }}</div>
        <div>
          <span>{{ taskPageData.fristVipCount }}</span>
          <van-icon name="search" />
        </div>
      </div>
      <div class="grade-list" @click="$router.push('/team')">
        <div class="grade-list-img">2</div>
        <div>{{ taskPageData.twoCount }}</div>
        <div>
          <span>{{ taskPageData.twoVipCount }}</span>
          <van-icon name="search" />
        </div>
      </div>
      <div class="grade-list" @click="$router.push('/team')">
        <div class="grade-list-img">3</div>
        <div>{{ taskPageData.thereCount }}</div>
        <div>
          <span>{{ taskPageData.thereVipCount }}</span>
          <van-icon name="search" />
        </div>
      </div>
    </div>
    <div class="grade">
      <div class="grade-title">当前邀请</div>
      <van-row type="flex" justify="space-between">
        <van-col span="8">
          <div class="revenue-text">
            <div>
              <span>{{ taskPageData.dayRegCount }}</span>
              <span>+</span>
            </div>
            <div>成员规模</div>
            <img class="invite-bg-img" src="@/assets/invite-icon6.png" alt="" />
          </div>
        </van-col>
        <van-col span="8">
          <div class="revenue-text">
            <div>
              <span>{{ taskPageData.dayRegActiveCount }}</span>
              <span>+</span>
            </div>
            <div>有效人群</div>
            <img class="invite-bg-img" src="@/assets/invite-icon6.png" alt="" />
          </div>
        </van-col>
        <van-col span="8">
          <div class="revenue-text">
            <div>
              <span>{{ taskPageData.dayTeamBound }}</span>
              <span>w</span>
            </div>
            <div>团队收益</div>
            <img class="invite-bg-img" src="@/assets/invite-icon6.png" alt="" />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="prompt">
      <div class="prompt-txt">
        lorem ipsum dolor slt amet,consecectetur adipiscing elit,seddoeiusmod
        tempor incididunt ut labore magna allqua.
      </div>
    </div>
  </div>
</template>
<script>
import { taskPage } from "@/api";

export default {
  data() {
    return {
      fanhui: require("@/assets/fanhui.png"),
      taskPageData: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await taskPage();
      if (res.status === 0) {
        this.taskPageData = res.data.data;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(0deg, #ee4900 0%, #fcb173 100%);
  padding: 200px 0 20px 0;
}

.fanhui {
  position: fixed;
  top: 47px;
  left: 54px;
  width: 18px;
  height: 32px;
  z-index: 99;
}

.title {
  width: 640px;
  height: 148px;
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
    color: #ffffff;
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
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.bonus {
  width: 703px;
  height: 652px;
  background-image: url("@/assets/invite-icon3.png");
  background-size: 100%;
  margin: 0 auto;
  padding-top: 155px;

  .bonus-title {
    text-align: center;
    color: #ffffff;
    font-size: 32px;
  }

  .bonus-num {
    padding-top: 40px;
    text-align: center;
    font-size: 36px;
    color: #ffffff;
  }

  .bonus-income {
    padding-top: 50px;
    text-align: center;

    > div:nth-child(1) {
      font-size: 25px;
      color: #343434;
    }

    > div:nth-child(2) {
      font-size: 33px;
      color: #c6262d;
    }
  }

  .bonus-button {
    display: flex;
    flex-direction: column;
    align-items: center;

    .van-button {
      width: 325px;
      height: 69px;
      font-size: 31px;
      margin: 20px 0;
    }

    .bonus-button-txt {
      font-size: 20px;
      color: #2b253c;
    }
  }
}

.grade {
  width: 703px;
  // height: 470px;
  background-image: url("@/assets/invite-icon4.png");
  background-size: 100% 100%;
  margin: 0 auto;
  padding: 30px 20px 60px 20px;
  text-align: center;

  .grade-title {
    color: #4d2101;
    font-size: 36px;
    position: relative;
  }

  .grade-row {
    font-size: 36px;
    color: #4d2101;
    padding: 20px 0 0 0;
  }

  .grade-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px 0 60px;
    font-size: 34px;
    color: #4d2101;
    background: #fde2cd;
    border-radius: 49px;
    margin-top: 10px;

    .grade-list-img {
      width: 64px;
      height: 77px;
      line-height: 77px;
      background-image: url("@/assets/invite-icon5.png");
      background-size: 100%;
      text-align: center;
    }
  }
}

.revenue-text {
  color: #4d2101;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;

  > div:nth-child(1) {
    font-size: 40px;

    > span:nth-child(2) {
      font-size: 29px;
      vertical-align: top;
    }
  }

  > div:nth-child(2) {
    font-size: 22px;
  }

  > img {
    width: 104px;
    height: 82px;
  }
}

.prompt {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;

  .prompt-txt {
    // width: 721px;
    height: 160px;
    background: rgba(255, 255, 255, 0.8);
    border: 2.08px solid #f3bc9d;
    border-radius: 20px;
    box-shadow: -4px 0px 11px 4px rgba(205, 85, 51, 0.12);
    font-size: 22px;
    color: #a64f10;
    padding: 20px 50px;
    margin: 0 20px;
  }
}
:deep(.van-swipe__indicators--vertical) {
  display: none;
}

.grade-cion {
  position: absolute;
  right: 20px;
  bottom: 50%;
  transform: translateY(50%);
}
</style>