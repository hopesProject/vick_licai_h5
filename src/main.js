import Vue from "vue";
import App from "./App.vue";
import * as filters from "./filters"; // global filters
import i18n from "@/lang";
import router from "@/router/index"; // 导入路由实例
import store from "./store/index";
import Vant, { Toast } from "vant";
import "vant/lib/index.css";
import "./icons"; // icon
import "@/styles/index.scss"; // global css
import "amfe-flexible";
import "@/utils/components";
import VueClipboard from "vue-clipboard2";

Toast.setDefaultOptions("loading", { forbidClick: true });
Vue.prototype.$utils = filters;
Vue.config.productionTip = false;

Vue.use(VueClipboard);

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(Vant);
new Vue({
  i18n,
  router, // 将路由挂载到 Vue 实例
  store,
  render: (h) => h(App),
}).$mount("#app");
