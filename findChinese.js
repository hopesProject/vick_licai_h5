const fs = require("fs");
const path = require("path");

// 递归遍历目录
function traverseDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

// 查找中文内容
function findChineseInFile(filePath, chineseData) {
  if (path.extname(filePath) === ".vue") {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const regex = /\$t\(['"]([^'"]+)['"]\)/g;
    let match;
    while ((match = regex.exec(fileContent)) !== null) {
      const chineseText = match[1];
      // 假设中文内容是在单引号或双引号之间，你可以根据需要进行调整
      chineseData[chineseText] = chineseText;
    }
  }
}

// 搜索目录下的.vue文件
function searchVueFiles(dirPath) {
  const chineseData = {};
  traverseDir(dirPath, (filePath) => findChineseInFile(filePath, chineseData));

  return chineseData;
}

// 要搜索的目录路径
const srcDirPath = "./src";

// 开始搜索
let chineseData = searchVueFiles(srcDirPath);
chineseData = {
  // 路由需要自己配置
  系统设置: "系统设置",
  管理员: "管理员",
  平台设置: "平台设置",
  分销设置: "分销设置",
  支付设置: "支付设置",
  短信设置: "短信设置",
  薪资设置: "薪资设置",
  等级设置: "等级设置",
  广告管理: "广告管理",
  广告列表: "广告列表",
  会员管理: "会员管理",
  会员列表: "会员列表",
  钱包列表: "钱包列表",
  短信管理: "短信管理",
  分类列表: "分类列表",
  产品管理: "产品管理",
  普通列表: "普通列表",
  福利列表: "福利列表",
  活动列表: "活动列表",
  订单管理: "订单管理",
  产品列表: "产品列表",
  奖励管理: "奖励管理",
  奖励列表: "奖励列表",
  财产管理: "财产管理",
  系统上分列表: "系统上分列表",
  法币充值列表: "法币充值列表",
  法币提现列表: "法币提现列表",
  红包管理: "红包管理",
  红包记录: "红包记录",
  红包列表: "红包列表",
  统计管理: "统计管理",
  数据统计: "数据统计",
  业绩统计: "业绩统计",
  文章管理: "文章管理",
  新闻列表: "新闻列表",
  官方列表: "官方列表",
  文章列表: "文章列表",
  ...chineseData,
};
// 将结果保存为 JSON 文件
const jsonData = JSON.stringify(chineseData, null, 2);

fs.writeFileSync("./src/lang/zh.json", jsonData, "utf8");

console.log("搜索完成，并已保存为 chineseTexts.json 文件。");
