<template>
  <div>
    <van-nav-bar :title="$t('语言切换')" left-arrow @click-left="onClickLeft" />

    <main>
      <van-radio-group v-model="lang">
        <van-cell-group>
          <van-cell
            v-for="item in list"
            :key="item.value"
            :title="item.label"
            clickable
            @click="handleSetSize(item.value)"
          >
            <template #right-icon>
              <van-radio :name="item.value" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
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
      ],
    };
  },
  computed: {
    ...mapGetters(["lang"]),
  },
  methods: {
    handleSetSize(lang) {
      console.log(lang);
      this.$store.dispatch("setLang", lang);
      this.$i18n.locale = lang;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>