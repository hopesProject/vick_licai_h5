<template>
  <div class="xxiao">
    <van-nav-bar :title="$t('消息')" left-arrow @click-left="onClickLeft" />

    <div class="content-list">
      <div class="list-item">
        <img :src="xiaoxi1" alt="" />
        <div class="right-box">
          <div class="flex justify-between">
            <p>交易物流通知</p>
            <p class="time">22/10/2022 12:24:36</p>
          </div>
          <div class="flex justify-between ddhb">
            <p>您的订单20200718141707762211已发货...</p>
            <div class="hb">9</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xiaoxi1: require("@/assets/xiaoxi1.png"),
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
.xxiao {
  background-color: #f8f8f8;
  height: 100vh;
  .list-item {
    width: 100%;
    background-color: #fff;
    padding: 15px 18px;
    display: flex;
    font-size: 27px;
    font-weight: 500;
    color: #333333;
    .right-box {
      width: 100%;
    }
    .time {
      font-size: 24px;
      color: #999999;
    }
    .ddhb {
      font-size: 24px;
      color: #666666;
      margin-top: 16px;
      .hb {
        min-width: 30px;
        padding: 0 10px;
        height: 30px;
        background: #fe0101;
        color: #fff;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
      }
    }
    img {
      width: 90px;
      height: 90px;
      margin-right: 18px;
    }
  }
}
</style>