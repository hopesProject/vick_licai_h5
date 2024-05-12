import axios from "axios";
import { Notify, Toast } from "vant";
import store from "@/store";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_APIS, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers["token"] = store.getters.token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.

    switch (res.status / 1) {
      case 0:
        return res;
      case 403:
        // OUT_TOKEN
        store.commit("OUT_TOKEN"); //
        break;
      default:
        break;
    }
    Notify({ type: "danger", message: error.msg || "Error" });
    return Promise.reject(new Error(res.msg || "Error"));
  },
  (error) => {
    if (error.response.status === 403) {
      store.commit("OUT_TOKEN"); //
      Notify({
        type: "danger",
        message: "请登录",
      });
      return Promise.reject(error);
    }

    Notify({
      type: "danger",
      message: error.message || "Error",
    });

    return Promise.reject(error);
  }
);

export default service;
