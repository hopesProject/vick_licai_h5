import Vue from "vue";
import VueI18n from "vue-i18n";
//引入自定义语言配置
import zh from "./zh.json";
import en from "./en.json";
import Cookies from "js-cookie";
import store from "@/store";
Vue.use(VueI18n); // 全局注册国际化包

// 准备翻译的语言环境信息
const i18n = new VueI18n({
  // locale: Cookies.get("language") || "en", // set locale
  locale: store.getters.lang, // set locale
  messages: {
    "zh-CN": {
      ...zh,
    },
    en: {
      ...en,
    },
  },
  silentTranslationWarn: true, //解决vue-i18n黄色警告"value of key 'xxx' is not a string"和"cannot translate the value of keypath 'xxx'.use the value of keypath as default",可忽略
  globalInjection: true, // 全局注入
  fallbackLocale: "en", // 指定的locale没有找到对应的资源或当前语种不存在时，默认设置当前语种为中文
});

export default i18n;
