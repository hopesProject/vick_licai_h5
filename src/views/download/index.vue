<template>
  <div class="vip-warp">
    <img @click="$router.go(-1)" :src="fanhui" alt="" class="fanhui" />
    <div class="phone2-bg bg"></div>
    <div class="phone bg"></div>
    <div class="phone1-bg bg"></div>

    <main>
      <div class="but-box">
        <img :src="pingguo" alt="" />
        <p>ipone download</p>
      </div>
      <div class="but-box">
        <img :src="anzjo" alt="" />
        <p>Android download</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fanhui: require("@/assets/fanhui.png"),
      pingguo: require("@/assets/苹果.png"),
      anzjo: require("@/assets/安卓.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
  padding-bottom: 70px;
}
.but-box {
  display: flex;
  align-items: center;
  padding-left: 50px;
  width: 414px;
  height: 81px;
  background: #fcfcfc;
  border-radius: 40px;
  font-size: 30px;
  font-family: Adobe Heiti Std, Adobe Heiti Std-R;
  font-weight: normal;
  text-align: center;
  color: #5e89ef;
  line-height: 36px;
  margin-bottom: 20px;
  img {
    width: 45px;
    height: 54px;
    margin-right: 20px;
  }
  p {
    background: linear-gradient(0deg, #ff947c 0%, #ffb98c 100%);
    font-size: 30px;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
    font-weight: normal;
    text-align: center;
    color: #5e89ef;
    line-height: 36px;
    -webkit-background-clip: text;
    /* Chrome, Safari */
    background-clip: text;
    -webkit-text-fill-color: transparent;
    /* Chrome, Safari */
    color: transparent;
  }
}
.vip-warp {
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/矩形.png");
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .phone2-bg {
    background-image: url("@/assets/路径 2.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left bottom;
  }
  .phone {
    background-image: url("@/assets/手机1 拷贝.png");
    background-size: 486px 939px;
    background-repeat: no-repeat;

    background-position: 50% 77px;
  }
  .phone1-bg {
    background-image: url("@/assets/路径.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left bottom;
  }

  .fanhui {
    position: fixed;
    top: 47px;
    left: 54px;
    width: 18px;
    height: 32px;
    z-index: 99;
  }
}
</style>