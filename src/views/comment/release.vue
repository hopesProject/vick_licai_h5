<template>
  <div>
    <van-nav-bar
      :title="$t('发布')"
      :right-text="$t('规则')"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <main>
      <van-field
        v-model="form.comment"
        rows="5"
        autosize
        type="textarea"
        maxlength="50"
        :placeholder="$t('发布动态 记录这一刻，晒给懂你的人……')"
        show-word-limit
      />

      <div class="main">
        <van-uploader
          v-if="!form.img"
          multiple
          :max-count="1"
          :after-read="afterRead"
        />
        <van-image v-else width="100" height="100" :src="form.img" />
        <div>
          <van-rate
            v-model="form.start"
            allow-half
            void-icon="star"
            void-color="#eee"
            color="#F4B94A"
          />
        </div>
        <div class="but-box">
          <van-button type="primary" @click="set">{{ $t("发布") }}</van-button>
        </div>
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
      fileList: [
        {
          url: "https://img01.yzcdn.cn/vant/leaf.jpg",
          status: "uploading",
          message: "上传中...",
        },
      ],
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
    onClickRight() {
      this.$router.push("/rule");
    },
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
.main {
  padding: 20px;
  background-color: #fff;
}
.but-box {
  display: flex;
  justify-content: flex-end;
}
</style>