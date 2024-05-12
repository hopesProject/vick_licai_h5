import Vue from "vue";

import Cookies from "js-cookie";
import { i18n } from "@/lang";
import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import VueClipboard from "vue-clipboard2";

import Element from "element-ui";
import Big from "big.js";
import "./styles/element-variables.scss";
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import "@/styles/index.scss"; // global css
import App from "./App";
import store from "./store";
import router from "./router";

import "./icons"; // icon
import "./permission"; // permission control
import "./utils/error-log"; // error log

import * as filters from "./filters"; // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value), // 这里会根据选的语言切换Element-ui的语言
  size: Cookies.get("size") || "medium", // set element-ui default size
});

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
Vue.prototype._i18n = i18n;
Vue.prototype.$big = Big;
Vue.use(VueClipboard);

new Vue({
  el: "#app",
  i18n,
  router,
  store,
  render: (h) => h(App),
});
