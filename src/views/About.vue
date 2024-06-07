<template>
  <div>
    <van-nav-bar :title="$t('关于我们')" left-arrow @click-left="onClickLeft" />
    <div v-html="e_setting_about_us"></div>
  </div>
</template>

<script>
import { getAppSettingInfo } from "@/api";

export default {
  data() {
    return {
      e_setting_about_us: "",
    };
  },
  mounted() {
    this.getShuoming();
  },
  methods: {
    async getShuoming() {
      try {
        const res = await getAppSettingInfo({
          key: "e_setting_about_us",
        });
        this.e_setting_about_us = res.data.svalue;
      } catch (error) {}
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>