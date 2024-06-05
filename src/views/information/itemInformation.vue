<template>
  <div>
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    <h1 v-html="data.title"></h1>
    <div class="ndesc" v-if="data.ndesc">
      {{ data.ndesc }}
    </div>
    <main v-html="data.descText"></main>
  </div>
</template>

<script>
import { newsdetail, noticedetail } from "@/api";
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
    title() {
      switch (this.$route.query.type) {
        case "nes":
          return this.$t("新闻详情");
        default:
          return this.$t("公告详情");
      }
    },

    routerType() {
      switch (this.$route.query.type) {
        case "nes":
          return 1;
        default:
          return 0;
      }
    },
  },

  mounted() {
    console.log(this.$route.query);

    this.getList();
    // this.refreshMsgRed();
  },
  methods: {
    async getList() {
      if (this.routerType === 1) {
        const res = await newsdetail({ id: this.id });
        if (res.status === 0) {
          this.data = res.data;
          this.data.descText = this.data.content;
        }
      } else {
        const res = await noticedetail({ id: this.id });
        if (res.status === 0) {
          this.data = res.data;
        }
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
.ndesc {
  padding: 20px;
  font-size: 30px;
}
</style>