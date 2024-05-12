import Vue from "vue";
import Element from "element-ui";
import VueI18n from "vue-i18n";
import locale from "element-ui/lib/locale";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import en from "./en.json";
import zh from "./zh.json";
import Cookies from "js-cookie";
Vue.use(VueI18n);

const messages = {
  zh: {
    language: "简体中文",
    ...zh,
    ...zhLocale,
  },
  en: {
    language: "English",
    ...en,
    ...enLocale,
  },
};
const i18n = new VueI18n({
  locale: Cookies.get("language") || "zh", // set locale
  messages, // set locale messages
  silentTranslationWarn: true,
});

locale.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
});
// 导出messages 给切换语言的时候用
export { i18n, messages };
