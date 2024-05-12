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
    url: "/admin/productclassify/queryProductClassify", // 假地址 自行替换
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
    url: "/admin/product/buyProduct", // 假地址 自行替换
    method: "post",
    data: qs.stringify(data),
  });
}
// 获取够面列表
export function productRecord(params) {
  return request({
    url: "/productRecord/selectAll", // 假地址 自行替换
    method: "get",
    params,
  });
}
