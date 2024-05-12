import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "我的桌面", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/esmanager",
    component: Layout,
    redirect: "/esmanager/administrator",
    meta: { title: "系统设置", icon: "dashboard", affix: true },
    children: [
      {
        path: "administrator",
        component: () => import("@/views/esmanager/administrator"),
        name: "administrator",
        meta: { title: "管理员", icon: "dashboard", affix: true },
      },
      {
        path: "platform",
        component: () => import("@/views/esmanager/platform"),
        name: "platform",
        meta: { title: "平台设置", icon: "dashboard", affix: true },
      },
      // {
      //   path: "distribution",
      //   component: () => import("@/views/esmanager/distribution"),
      //   name: "distribution",
      //   meta: { title: "分销设置", icon: "dashboard", affix: true },
      // },
      // {
      //   path: 'pay',
      //   component: () => import('@/views/esmanager/pay'),
      //   name: 'pay',
      //   meta: { title: '支付设置', icon: 'dashboard', affix: true }
      // },
      // {
      //   path: 'message',
      //   component: () => import('@/views/esmanager/message'),
      //   name: 'message',
      //   meta: { title: '短信设置', icon: 'dashboard', affix: true }
      // },
      {
        path: "salary",
        component: () => import("@/views/esmanager/salary"),
        name: "salary",
        meta: { title: "薪资设置", icon: "dashboard", affix: true },
      },
      {
        path: "grade",
        component: () => import("@/views/esmanager/grade"),
        name: "grade",
        meta: { title: "等级设置", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/advertising-management",
    component: Layout,
    redirect: "/advertising-management/list",
    meta: { title: "广告管理", icon: "dashboard", affix: true },
    children: [
      {
        path: "list",
        component: () => import("@/views/advertising-management/list"),
        name: "list",
        meta: { title: "广告列表", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/article-list",
    meta: { title: "文章管理", icon: "dashboard", affix: true },
    children: [
      // {
      //   path: "article-list",
      //   component: () => import("@/views/article/article-list"),
      //   name: "articleList",
      //   meta: { title: "文章列表", icon: "dashboard", affix: true },
      // },
      {
        path: "events-list",
        component: () => import("@/views/article/events-list"),
        name: "eventsList",
        meta: { title: "公告列表", icon: "dashboard", affix: true },
      },
      {
        path: "news-list",
        component: () => import("@/views/article/news-list"),
        name: "newsList",
        meta: { title: "新闻列表", icon: "dashboard", affix: true },
      },
      {
        path: "official-list",
        component: () => import("@/views/article/official-list"),
        name: "officialList",
        meta: { title: "官方列表", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/member",
    component: Layout,
    redirect: "/member/member-list",
    meta: { title: "会员管理", icon: "dashboard", affix: true },
    children: [
      {
        path: "member-list",
        component: () => import("@/views/member/member-list"),
        name: "memberList",
        meta: { title: "会员列表", icon: "dashboard", affix: true },
      },
      {
        path: "wallet-list",
        component: () => import("@/views/member/wallet-list"),
        name: "walletList",
        meta: { title: "钱包列表", icon: "dashboard", affix: true },
      },
      {
        path: "sms-list",
        component: () => import("@/views/member/sms-list"),
        name: "smsList",
        meta: { title: "短信管理", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/product",
    component: Layout,
    redirect: "/product/product-list",
    meta: { title: "产品管理", icon: "dashboard", affix: true },
    children: [
      {
        path: "category-list",
        component: () => import("@/views/product/category-list"),
        name: "categoryList",
        meta: { title: "分类列表", icon: "dashboard", affix: true },
      },
      {
        path: "normal-list",
        component: () => import("@/views/product/normal-list"),
        name: "normalList",
        meta: { title: "产品列表", icon: "dashboard", affix: true },
      },
      // {
      //   path: "member-list",
      //   component: () => import("@/views/product/member-list"),
      //   name: "productMemberList",
      //   meta: { title: "会员列表", icon: "dashboard", affix: true },
      // },
      // {
      //   path: "benefits-list",
      //   component: () => import("@/views/product/benefits-list"),
      //   name: "benefitsList",
      //   meta: { title: "福利列表", icon: "dashboard", affix: true },
      // },
      // {
      //   path: "events-list",
      //   component: () => import("@/views/product/events-list"),
      //   name: "eventsList",
      //   meta: { title: "活动列表", icon: "dashboard", affix: true },
      // },
    ],
  },
  {
    path: "/order",
    component: Layout,
    redirect: "/order/order-list",
    meta: { title: "订单管理", icon: "dashboard", affix: true },

    children: [
      {
        path: "order-list",
        component: () => import("@/views/order/list"),
        name: "orderList",
        meta: { title: "产品列表", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/reward",
    component: Layout,
    redirect: "/reward/list",
    meta: { title: "奖励管理", icon: "dashboard", affix: true },

    children: [
      {
        path: "list",
        component: () => import("@/views/reward/list"),
        name: "rewardList",
        meta: { title: "奖励列表", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/property",
    component: Layout,
    redirect: "/property/property-list",
    meta: { title: "财产管理", icon: "dashboard", affix: true },

    children: [
      {
        path: "scores-list",
        component: () => import("@/views/property/scores"),
        name: "scoresList",
        meta: { title: "系统上分列表", icon: "dashboard", affix: true },
      },
      {
        path: "topup-list",
        component: () => import("@/views/property/topup"),
        name: "topupList",
        meta: { title: "法币充值列表", icon: "dashboard", affix: true },
      },
      {
        path: "withdraw-list",
        component: () => import("@/views/property/withdraw"),
        name: "withdrawList",
        meta: { title: "法币提现列表", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/envelope",
    component: Layout,
    redirect: "/envelope/envelope-list",
    meta: { title: "红包管理", icon: "dashboard", affix: true },

    children: [
      {
        path: "envelope-list",
        component: () => import("@/views/envelope/list"),
        name: "envelopeList",
        meta: { title: "红包列表", icon: "dashboard", affix: true },
      },
      {
        path: "envelope-record",
        component: () => import("@/views/envelope/record"),
        name: "recordList",
        meta: { title: "红包记录", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/statistical",
    component: Layout,
    redirect: "/statistical/index",
    meta: { title: "统计管理", icon: "dashboard", affix: true },

    children: [
      {
        path: "index",
        component: () => import("@/views/statistical/index"),
        name: "statistics",
        meta: { title: "数据统计", icon: "dashboard", affix: true },
      },
      {
        path: "performance",
        component: () => import("@/views/statistical/performance"),
        name: "performance",
        meta: { title: "业绩统计", icon: "dashboard", affix: true },
      },
    ],
  },
  // {
  //   path: "/ceshi",
  //   component: Layout,
  //   redirect: "/ceshi/index",
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/ceshi/index"),
  //       name: "ceshi",
  //       meta: { title: "ceshi", icon: "ceshi", affix: true },
  //     },
  //   ],
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
