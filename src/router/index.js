// router.js
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

// 导入组件
import Home from "@/views/Home";
import About from "@/views/About.vue";
import information from "@/views/information";
import vipList from "@/views/vip-list";
import recharge from "@/views/recharge";
import login from "@/views/login";
import withdrawal from "@/views/withdrawal";
import PurchaseHistory from "@/views/PurchaseHistory";
import EarningsRecord from "@/views/Earnings-record";
import bankCard from "@/views/bank-card";
import My from "@/views/My";
import download from "@/views/download";
import addBankCard from "@/views/add-bank-card";
import Team from "@/views/team";
import share from "@/views/share";
import password from "@/views/password";
import register from "@/views/register";
import capital from "@/views/capital";
import invite from "@/views/invite";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      show: true,
    },
  },
  {
    path: "/about",
    component: About,
    meta: {
      show: true,
    },
  },
  // 消息列表
  {
    path: "/information",
    component: information,
    meta: {
      show: false,
    },
  },
  // vip列表
  {
    path: "/vip-list",
    component: vipList,
    meta: {
      show: false,
    },
  },
  // 充值
  {
    path: "/recharge",
    component: recharge,
    meta: {
      show: false,
    },
  },
  // 登录
  {
    path: "/login",
    component: login,
    meta: {
      show: false,
    },
  },
  // 分享
  {
    path: "/share",
    component: share,
    meta: {
      show: false,
    },
  },
  // 提现
  {
    path: "/withdrawal",
    component: withdrawal,
    meta: {
      show: false,
    },
  },
  // Purchase History购买记录
  {
    path: "/purchase-history",
    component: PurchaseHistory,
    meta: {
      show: false,
    },
  },
  // Purchase History收益记录
  {
    path: "/earnings-record",
    component: EarningsRecord,
    meta: {
      show: true,
    },
  },
  // 下载
  {
    path: "/download",
    component: download,
    meta: {
      show: false,
    },
  },
  // Purchase 银行卡
  {
    path: "/bank-card",
    component: bankCard,
    meta: {
      show: false,
    },
  },
  // 添加银行卡
  {
    path: "/add-bank-card",
    component: addBankCard,
    meta: {
      show: false,
    },
  },
  // 我的
  {
    path: "/my",
    component: My,
    meta: {
      show: true,
      requiresAuth: true,
    },
  },
  // 团队
  {
    path: "/team",
    component: Team,
    meta: {
      show: true,
    },
  },
  // 忘记密码
  {
    path: "/password",
    component: password,
    meta: {
      show: false,
    },
  },
  // 注册
  {
    path: "/register",
    component: register,
    meta: {
      show: false,
    },
  },
  // 资金详情
  {
    path: "/capital",
    component: capital,
    meta: {
      show: false,
    },
  },
  // 邀请好友
  {
    path: "/invite",
    component: invite,
    meta: {
      show: false,
    },
  },
  // {
  //   // 会匹配所有路径
  //   path: "*",
  //   redirect: "/",
  // },
];

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 }),
});
router.beforeEach((to, from, next) => {
  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    // 判断用户是否已登录
    if (store.getters.token) {
      // 用户已登录，允许访问
      next();
    } else {
      // 用户未登录，并且当前不在登录页面或者当前页面不需要认证
      if (to.path !== "/login") {
        // 重定向到登录页面
        next("/login");
      } else {
        // 如果已经在登录页面，则放行
        next();
      }
    }
  } else {
    // 不需要认证的页面，直接放行
    next();
  }
});

export default router;
