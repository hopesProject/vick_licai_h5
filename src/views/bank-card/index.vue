<template>
  <div>
    <van-nav-bar :title="$t('银行卡管理')" left-arrow @click-left="onClickLeft" />

    <div class="box">
      <div class="item-box"></div>
      <div class="item-box item-box1"></div>
      <div class="item-box item-box2"></div>
      <img src="@/assets/addbank.png" alt="" @click="$router.push('/add-bank-card')">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.item-box {
  margin: 0 auto;
  width: 662px;
  height: 238px;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%), #ffba8c;
  margin-bottom: 35px;
  background-image: url("@/assets/visa.png");
  background-size: 84px 29px;
  background-repeat: no-repeat;
  background-position: left 38px bottom 63px;
}

.item-box1 {
  background: linear-gradient(-32deg, #74ae8b 0%, #81c29a 99%);
}

.item-box2 {
  background: linear-gradient(-32deg, #5c81c1 0%, #89b4e6 99%);
}

.box {
  position: relative;

  >img {
    width: 118px;
    height: 118px;
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>