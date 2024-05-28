<template>
  <div>
    <van-nav-bar :title="$t('语言')" left-arrow @click-left="onClickLeft" />

    <main>
      <van-cell
        v-for="item in list"
        :key="item.value"
        :title="item.label"
        clickable
        @click="handleSetSize(item.value)"
      >
        <template #right-icon>
          <svg-icon
            class="font-svg"
            style="margin-left: 10px"
            iconClass="xyjt"
          />
        </template>
      </van-cell>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      list: [
        { label: "简体中文", value: "zh-CN" },
        { label: "English", value: "en" },
        { label: "हिन्दी或हिंदी", value: "hi" },
      ],
    };
  },
  computed: {
    ...mapGetters(["lang"]),
  },
  methods: {
    handleSetSize(lang) {
      this.$store.dispatch("setLang", lang);
      this.$i18n.locale = lang;
      this.$router.go(-1);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
:deep([class*="van-hairline"]::after) {
  border: none;
}
</style>