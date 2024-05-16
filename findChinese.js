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

  ...chineseData,
};
// 将结果保存为 JSON 文件
const jsonData = JSON.stringify(chineseData, null, 2);

fs.writeFileSync("./src/lang/zh.json", jsonData, "utf8");

console.log("搜索完成，并已保存为 chineseTexts.json 文件。");
