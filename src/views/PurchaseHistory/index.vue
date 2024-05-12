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
        <div class="phone">123***789</div>
        <div>ID账号：888888</div>
      </div>
    </header>
    <main>
      <div v-for="item in data" :key="item.id" class="item-box">
        <img
          src="https://t7.baidu.com/it/u=4036010509,3445021118&fm=193&f=GIF"
          alt=""
        />
        <div class="content">
          <div class="mb">商品名称：1234456</div>
          <div>购买金额：109</div>
        </div>
        <div class="time">
          <div>购买时间：<span>2022-11-11</span></div>
          <div>到期时间：<span>2022-11-11</span></div>
          <div></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{ id: 1 }, { id: 2 }],
    };
  },
  methods: {
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
    font-size: 28px;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
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
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
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
  font-family: Adobe Heiti Std, Adobe Heiti Std-R;
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
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 20px;
    .phone {
      font-size: 32px;
      font-family: Adobe Heiti Std, Adobe Heiti Std-R;
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