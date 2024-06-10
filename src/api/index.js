import request from "@/utils/http";
import qs from "qs";

// 登录
export function login(data) {
  return request({
    url: "/api/user/login", // 假地址 自行替换
    method: "post",
    data: qs.stringify(data),
  });
}
// 登录
export function updatePwd(data) {
  return request({
    url: "/api/user/updatePwd", // 假地址 自行替换
    method: "post",
    data,
  });
}
// 注册
export function register(data) {
  return request({
    url: "/api/user/register", // 假地址 自行替换
    method: "post",
    data: data,
  });
}
// 产品分类
export function queryProductClassify(params) {
  return request({
    url: "/api/productClassify/queryProductClassify", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 产品分类
export function getCustomerService(params) {
  return request({
    url: "/api/user/getCustomerService", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 产品详情
export function queryProductDetail(params) {
  return request({
    url: "/api/product/queryProductDetail", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function detail(params) {
  return request({
    url: "/api/msg/detail", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 产品分类
export function queryMsgCount(params) {
  return request({
    url: "/api/msg/queryMsgCount", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 产品分类
export function refreshMsgRed(params) {
  return request({
    url: "/api/msg/refreshMsgRed", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function queryMsg(params) {
  return request({
    url: "/api/msg/queryMsg", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 获取产品列表
export function productqueryProductClassify(params) {
  return request({
    url: "/api/product/queryProductClassify", // 假地址 自行替换
    method: "get",
    params,
  });
}

// export function queryPaySetting(params) {
//   return request({
//     url: "/api/paySetting/queryPaySetting", // 假地址 自行替换
//     method: "get",
//     params,
//   });
// }
// export function productqueryProductClassify(params) {
//   return request({
//     url: "/api/product/queryProductClassify", // 假地址 自行替换
//     method: "get",
//     params,
//   });
// }
export function transactionGetEarnings(params) {
  return request({
    url: "/api/userinfo/transactionGetEarnings", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function getAppSettingInfo(params) {
  return request({
    url: "/api/user/getAppSettingInfo", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 获取产品列表
export function queryNews(params) {
  return request({
    url: "/api/news/queryNews", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 获取产品列表
export function newsdetail(params) {
  return request({
    url: "/api/news/detail", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 获取产品列表
export function uploadImge(params) {
  return request({
    url: "/api/userinfo/uploadImge", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 购买
export function buyProduct(data) {
  return request({
    url: "/api/order/buyProduct", // 假地址 自行替换
    method: "post",
    data,
  });
}
// 购买
export function bindBankCard(data) {
  return request({
    url: "/api/userinfo/bindBankCard", // 假地址 自行替换
    method: "post",
    data,
  });
}
// 购买
export function rechage(data) {
  return request({
    url: "/api/userinfo/rechage", // 假地址 自行替换
    method: "post",
    data,
  });
}
// 购买
export function withdraw(data) {
  return request({
    url: "/api/userinfo/withdraw", // 假地址 自行替换
    method: "post",
    data,
  });
}
export function userinfoupdatePwd(data) {
  return request({
    url: "/api/userinfo/updatePwd", // 假地址 自行替换
    method: "post",
    data,
  });
}
// 获取够面列表
export function productRecord(params) {
  return request({
    url: "/api/userinfo/queryOrder", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 资金流水
//
// (query)	type
// 1 充值 2 体现 3 购买 4 奖励 5分润 6 收益
export function transactionRecord(params) {
  return request({
    url: "/api/userinfo/transactionRecord", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function getEarnings(params) {
  return request({
    url: "/api/userinfo/getEarnings", // 假地址 自行替换
    method: "get",
    params,
  });
}

// 发送验证码
export function sendCode(params) {
  return request({
    url: "/api/user/sendCode", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 发送验证码
export function deleteBank(params) {
  return request({
    url: "/api/userinfo/deleteBank", // 假地址 自行替换
    method: "delete",
    params,
  });
}
// 查询用户等级
export function queryUserLevel(params) {
  return request({
    url: "/api/userinfo/queryUserLevel", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 查询用户等级
export function getUserInfo(params) {
  return request({
    url: "/api/userinfo/getUserInfo", // 假地址 自行替换
    method: "get",
    params,
  });
}
// 查询用户等级
export function getLevelSetting(params) {
  return request({
    url: "/api/userinfo/getLevelSetting", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function queryNoteice(params) {
  return request({
    url: "/api/notice/queryNoteice", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function taskPage(params) {
  return request({
    url: "/api/userinfo/taskPage", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function querycomment(params) {
  return request({
    url: "/api/comment/querycomment", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function queryProductisHot(params) {
  return request({
    url: "/api/product/queryProductisHot", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function queryPaySetting(params) {
  return request({
    url: "/api/paySetting/queryPaySetting", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function noticedetail(params) {
  return request({
    url: "/api/notice/detail", // 假地址 自行替换
    method: "get",
    params,
  });
}
export function queryBannerList(params) {
  return request({
    url: "/api/comment/queryBannerList", // 假地址 自行替换
    method: "get",
    params,
  });
}

export function sendComment(data) {
  return request({
    url: "/api/comment/sendComment", // 假地址 自行替换
    method: "post",
    data,
  });
}

// this.actionUrl = process.env.VUE_APP_BASE_APIS + "/file/upload";
// 上传图片
export function fileUpload(data) {
  return request({
    url: "/file/upload", // 假地址 自行替换
    method: "post",
    data,
  });
}
