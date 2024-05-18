<template>
  <div>
    <van-nav-bar :title="$t('消息详情')" left-arrow @click-left="onClickLeft" />
    <h1 v-html="data.title"></h1>
    <main v-html="data.descText"></main>
  </div>
</template>

<script>
import { noticedetail } from "@/api";
export default {
  data() {
    return {
      data: {},
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  mounted() {
    console.log(this.$route.query.id);
    this.getList();
  },
  methods: {
    async getList() {
      const res = await noticedetail({ id: this.id });
      if (res.status === 0) {
        this.data = res.data;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
main {
  padding: 20px;
  font-size: 0.42rem;
  word-wrap: break-word;
}
</style>