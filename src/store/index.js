import { getUserInfo, login } from "@/api";
import router from "@/router";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

let state = {
  userInfo: {},
  token: "",
  lang: "en",
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  actions: {
    async getLogin({ commit }, data) {
      commit("SET_TOKEN", data);
    },
    async getUserInfo({ commit }, data) {
      const res = await getUserInfo();
      if (res.status === 0) {
        commit("SET_USERINFO", res.data);
      }
      // commit("SET_TOKEN", data);
    },
    setLang({ commit }, lang) {
      commit("SET_LANG", lang);
    },
  },
  mutations: {
    SET_LANG(state, data) {
      state.lang = data;
    },
    SET_TOKEN(state, data) {
      state.token = data.token;
      state.userInfo = data.user;
    },
    SET_USERINFO(state, data) {
      state.userInfo = {
        ...state.userInfo,
        ...data,
      };
    },
    OUT_TOKEN(state, data) {
      state.token = "";
      state.userInfo = {};
      router.push("/login");
    },
  },
  getters: {
    token: (state) => state.token,
    userInfo: (state) => state.userInfo,
    lang: (state) => state.lang,
  },
});
