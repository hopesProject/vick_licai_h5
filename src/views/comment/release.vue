<template>
  <div>
    <van-nav-bar
      title="发布"
      right-text="规则"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <main>
      <van-field
        v-model="form.message"
        rows="5"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="发布动态 记录这一刻，晒给懂你的人……"
        show-word-limit
      />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { message: "" },
    };
  },
};
</script>

<style>
</style>