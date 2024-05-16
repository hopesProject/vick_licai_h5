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
// 获取产品列表
export function productqueryProductClassify(params) {
  return request({
    url: "/admin/product/queryProductClassify", // 假地址 自行替换
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
// 发送验证码
export function sendCode(params) {
  return request({
    url: "/api/user/sendCode", // 假地址 自行替换
    method: "get",
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
