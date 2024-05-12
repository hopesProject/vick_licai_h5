<template>
  <div class="fanhui">
    <img @click="$router.go(-1)" :src="fanhui" alt="" />
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      fanhui: require("@/assets/fanhui.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
.fanhui {
  z-index: 999;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20px 72px 0 54px;
  font-size: 36px;
  position: fixed;
  left: 0;
  right: 0;

  top: 0;
  > img {
    width: 18px;
    height: 32px;
  }

  > div {
    flex: 1;
    text-align: center;
  }
}
</style>