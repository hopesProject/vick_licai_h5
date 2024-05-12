import request from "@/utils/http";
import qs from "qs";

// 等级配置增删改查
export function addlevelSetting(data) {
  return request({
    url: "/admin/levelSetting/addlevelSetting", // 假地址 自行替换
    method: "post",
    data,
  });
}
export function dellevelSetting(params) {
  return request({
    url: "/admin/levelSetting/dellevelSetting", // 假地址 自行替换
    method: "delete",
    params,
  });
}
export function querylevelSetting() {
  return request({
    url: "/admin/levelSetting/querylevelSetting", // 假地址 自行替换
    method: "get",
  });
}
export function updatelevelSetting(data) {
  return request({
    url: "/admin/levelSetting/updatelevelSetting", // 假地址 自行替换
    method: "post",
    data,
  });
}

// 薪资配置增删改查
export function addPaySetting(data) {
  return request({
    url: "/admin/paySetting/addPaySetting", // 增加
    method: "post",
    data,
  });
}
export function delPaySetting(params) {
  return request({
    url: "/admin/paySetting/delPaySetting", // 删除
    method: "delete",
    params,
  });
}
export function updatePaySetting(data) {
  return request({
    url: "/admin/paySetting/updatePaySetting", // 修改
    method: "post",
    data,
  });
}
export function queryPaySetting(data) {
  return request({
    url: "/admin/paySetting/queryPaySetting", // 查询
    method: "get",
    data,
  });
}

// 设置模块
// export function addPaySetting(data) {
//   return request({
//     url: "/admin/paySetting/addPaySetting", // 增加
//     method: "post",
//     data,
//   });
// }
// export function delPaySetting(data) {
//   return request({
//     url: "/admin/paySetting/delPaySetting", // 删除
//     method: "delete",
//     data,
//   });
// }
export function updateSetting(data) {
  return request({
    url: "/admin/setting/updateSetting", // 修改
    method: "post",
    data,
  });
}
export function querySetting(params) {
  return request({
    url: "/admin/setting/querySetting", // 查询
    method: "get",
    params,
  });
}

// 产品分类
export function addProductClassify(data) {
  return request({
    url: "/admin/productclassify/addProductClassify", // 增加
    method: "post",
    data,
  });
}
export function delProductClassify(params) {
  return request({
    url: "/admin/productclassify/delProductClassify", // 删除
    method: "delete",
    params,
  });
}
export function updateProductClassify(data) {
  return request({
    url: "/admin/productclassify/updateProductClassify", // 修改
    method: "post",
    data,
  });
}
export function queryProductClassify(params) {
  return request({
    url: "/admin/productclassify/queryProductClassify", // 查询
    method: "get",
    params,
  });
}

// 产品
export function productaddProductClassify(data) {
  return request({
    url: "/admin/product/addProductClassify", // 增加
    method: "post",
    data,
  });
}
export function productdelProductClassify(params) {
  return request({
    url: "/admin/product/delProductClassify", // 删除
    method: "delete",
    params,
  });
}
export function productupdateProductClassify(data) {
  return request({
    url: "/admin/product/updateProductClassify", // 修改
    method: "post",
    data,
  });
}
export function productqueryProductClassify(params) {
  return request({
    url: "/admin/product/queryProductClassify", // 查询
    method: "get",
    params,
  });
}

// 产品
export function addUser(data) {
  return request({
    url: "/admin/setting/addUser", // 增加
    method: "post",
    data,
  });
}
export function delUser(params) {
  return request({
    url: "/admin/setting/delUser", // 删除
    method: "delete",
    params,
  });
}
export function updateUser(data) {
  return request({
    url: "/admin/setting/updateUser", // 修改
    method: "post",
    data,
  });
}
export function queryUser(params) {
  return request({
    url: "/admin/setting/queryUser", // 查询
    method: "get",
    params,
  });
}

// 产品
export function sysaddUser(data) {
  return request({
    url: "/sys/user/addUser", // 增加
    method: "post",
    data,
  });
}
export function sysdelUser(data) {
  return request({
    url: "/sys/user/delUser", // 删除
    method: "post",
    data: qs.stringify(data),
  });
}
export function login(data) {
  return request({
    url: "/sys/user/login", // 删除
    method: "post",
    data: qs.stringify(data),
  });
}
export function sysupdateUser(data) {
  return request({
    url: "/sys/user/updateUser", // 修改
    method: "post",
    data,
  });
}
export function sysqueryUser(params) {
  return request({
    url: "/sys/user/queryUser", // 查询
    method: "get",
    params,
  });
}

// 产品
export function addNotice(data) {
  return request({
    url: "/sys/notice/addNotice", // 增加
    method: "post",
    data,
  });
}
export function deleteNotice(data) {
  return request({
    url: "/sys/notice/deleteNotice", // 删除
    method: "post",
    data: qs.stringify(data),
  });
}

export function updateNotice(data) {
  return request({
    url: "/sys/notice/updateNotice", // 修改
    method: "post",
    data,
  });
}
export function queryAllNotice(params) {
  return request({
    url: "/sys/notice/page", // 查询
    method: "get",
    params,
  });
}
