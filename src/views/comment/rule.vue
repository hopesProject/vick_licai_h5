<template>
  <div>
    <van-nav-bar :title="$t('规则')" left-arrow @click-left="onClickLeft" />

    <main>
      <div class="explain">
        <p>Share withdrawal screenshots to earn cash rewards</p>
        <p>
          Method 1. Send your latest successful withdrawal screenshot to the
          comment area, and you will receive a reward of 10-1000Rs immediately
          after passing the review.
        </p>
        <p>
          Method 2. Write your experience in the comment area and tell other
          users how much money you have earned here. After passing the review,
          you will receive a reward of 5-500Rs.
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import { sendComment } from "@/api";
import axios from "axios";
import { Toast } from "vant";

export default {
  data() {
    return {
      form: { comment: "", img: "", start: 0 },
    };
  },
  methods: {
    async set() {
      if (!this.form.comment) {
        return Toast(this.$t("请输入内容"));
      }
      const res = await sendComment(this.form);
      if (res.status === 0) {
        Toast(this.$t("发布成功"));
        setTimeout(() => {
          this.$router.go(-1);
        }, 1500);
      }
    },
    onClickRight() {},
    onClickLeft() {
      this.$router.go(-1);
    },
    async fileUpload(file) {
      const formData = new FormData();
      formData.append("file", file.file); // file.file 包含文件的原始数据
      try {
        const res = await axios.post(
          process.env.VUE_APP_BASE_APIS + "/file/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.status == 0) {
          this.form.img = res.data.data;
        }
      } catch (error) {}
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器

      if (file.length) {
        file.map((item) => {
          this.fileUpload(item);
        });
      } else {
        this.fileUpload(file);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  padding: 20px;
}
.explain {
  font-size: 30px;
}
</style>