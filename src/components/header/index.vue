<template>
  <div class="header" :style="`background-color: ${background}`">
    <div class="header-alltech">
      <img src="@/assets/img/alltech.png" alt="" />
    </div>
    <van-badge :dot="dot">
      <div class="header-news" @click="$router.push('/information')">
        <img src="@/assets/img/news.png" alt="" />
      </div>
    </van-badge>
  </div>
</template>

<script>
export default {
  props: {
    dot: {
      type: Boolean,
      default: true,
    },
    background: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 88px;
  align-items: center;
  padding: 0 30px;

  .header-alltech {
    height: 48px;
    width: 168px;
  }

  .header-news {
    width: 54px;
    height: 54px;
  }

  :deep(.van-badge--dot) {
    width: 16px;
    height: 16px;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
:deep(.van-badge--fixed) {
  top: 7px;
  right: 17px;
}
</style>