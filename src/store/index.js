import { login } from "@/api";
import router from "@/router";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

let state = {
  userInfo: {},
  token: "",
};

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  actions: {
    async getLogin({ commit }, data) {
      commit("SET_TOKEN", data);
    },
  },
  mutations: {
    SET_TOKEN(state, data) {
      state.token = data.token;
      state.userInfo = data.user;
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
  },
});
