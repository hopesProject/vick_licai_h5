<template>
  <div class="wrapper">
    <img @click="$router.go(-1)" :src="fanhui" alt="" class="fanhui" />
    <div class="title">
      <div>邀请好友</div>
      <div>分享现金</div>
    </div>
    <div class="card-income">
      <div class="income">提成收益</div>
      <van-row type="flex" justify="space-between" class="income-title">
        <van-col span="12">团队成员级别</van-col>
        <van-col span="8">佣金比例</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="income-txt">
        <van-col span="12">直属会员（1级）</van-col>
        <van-col span="8">30%</van-col>
        <van-col span="12">直属会员（2级）</van-col>
        <van-col span="8">6%</van-col>
        <van-col span="12">直属会员（3级）</van-col>
        <van-col span="8">3%</van-col>
      </van-row>
    </div>
    <div class="card-illustrate">
      <div class="illustrate">
        <div class="card-title">邀请收益</div>
        <div class="illustrate-txt">如果您邀请其他人加入团队，您将成 为团队的领导者。当您的团队成员购 买产品时，您都会获得一定比例的佣金。</div>
      </div>
    </div>
    <div class="card-illustrate">
      <div class="illustrate">
        <div class="card-title">长期收益</div>
        <div class="illustrate-txt">如果您邀请A，您将获得A总投资额的30%。
          A邀请B，您将获得B总投资额的6%的奖励B邀请C，你将获得C总投资额的3%作为奖励。您获得的奖励收益不会影响您的团队成员购买产品的投资收益。</div>
      </div>
    </div>
    <div class="invitation">
      <div class="invitation-code">
        <img src="" alt="">
        <div>我的邀请码：JHYGT</div>
      </div>
    </div>
    <div class="send">发送邀请</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fanhui: require("@/assets/fanhui.png"),
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/share-bg.png");
  background-size: 100%;
  padding-top: 70px;
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
  width: 360px;
  height: 177px;
  font-size: 80px;
  font-family: zhfyh, zhfyh-Regular;
  font-weight: 400;
  color: #ffffff;
  line-height: 95px;
  text-shadow: 0.77px 10.97px 65px 11px #ff320a, -9px 0px 0px 9px #f96b51;
  margin: auto;
}

.card-income {
  width: 691px;
  height: 589px;
  background-image: url("@/assets/share-card.png");
  background-size: 100%;
  background-position: 50% 50%;
  margin: 0 auto;
  padding: 160px 130px 140px 130px;
}

.card-illustrate {
  width: 691px;
  height: 589px;
  background-image: url("@/assets/share-card.png");
  background-size: 100%;
  background-position: 50% 50%;
  margin: 0 auto;
  padding: 160px 80px 140px 80px;
}

.income {
  font-size: 36px;
  font-family: Adobe Heiti Std, Adobe Heiti Std-R;
  font-weight: normal;
  text-align: center;
  color: #83563a;
  font-weight: 500;
}

.income-title {
  line-height: 60px;
  font-size: 30px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  color: #83563a;
}

.income-txt {
  line-height: 50px;
  font-size: 28px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  color: #83563a;
}

.illustrate {
  width: 100%;
  height: 100%;
  background: #fff9ba;
  border-radius: 12px;
  position: relative;

  .illustrate-txt {
    font-size: 26px;
    font-weight: 400;
    text-align: left;
    color: #83563a;
    padding: 60px 10px 10px 10px;
  }
}

.card-title {
  width: 273px;
  height: 141px;
  background-image: url("@/assets/share-title.png");
  background-size: 100%;
  text-align: center;
  line-height: 160px;
  color: #ffffff;
  font-size: 26px;
  position: absolute;
  top: -25%;
  left: 50%;
  transform: translateX(-50%);
}

.invitation {
  width: 608px;
  height: 230px;
  background-image: url("@/assets/invitation.png");
  background-size: 100%;
  margin: 0 auto;

  .invitation-code {
    height: 230px;
    width: 100%;
    margin: auto 0;
    background-image: url("@/assets/invitation-code.png");
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 40px;

    >img {
      width: 120px;
      height: 110px;
    }

    >div {
      margin-left: 16px;
      font-size: 33px;
      color: #ffffff;
    }
  }
}

.send {
  height: 183px;
  line-height: 170px;
  width: 100%;
  background-image: url("@/assets/send.png");
  background-size: 100%;
  text-align: center;
  color: #ff8143;
}
</style>