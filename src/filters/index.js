// import parseTime, formatTime and set to filter
const moment = require("moment-timezone");
// 设置时区为印度标准时间
// moment.tz.setDefault("Asia/Kolkata");

export function _timeFormat(v, format = "YYYY-MM-DD HH:mm:ss") {
  if (v) {
    return moment(v).format(format);
  } else {
    return "";
  }
}
export function _phoneSubstring(str) {
  let result = str.substring(0, 3) + "***" + str.substring(str.length - 3);
  return result;
}

export function _toLocaleString(
  number,
  showCurrencySymbol = true, // 是否显示货币符号，默认为 true
  locale = "en-IN", // 默认使用印度英语的语言环境
  options = {
    // style：可选值为 decimal（小数）、currency（货币）或 percent（百分比）；
    // currency：设置为货币样式时使用的符号，支持列表在这里；
    // useGrouping：布尔值，是否显示数字分位。
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2, // 如果不想要显示末尾的小数「.00」，只要设置一下最小分位 minimumFractionDigits 即可（默认是 2）：
  }
) {
  number = number || 0;
  number = Math.floor(number * 100) / 100; // 向下取整并保留两位小数

  let str = Number(number).toLocaleString(locale, options);
  if (showCurrencySymbol) {
    str = str.replace("₹", "");
  }
  return str;
}

export function maskPhoneNumber(phoneNumber) {
  phoneNumber = phoneNumber + "";
  // 检查输入的是否为字符串，并且长度大于等于4

  // 获取前三位和最后两位
  const start = phoneNumber.slice(0, 3);
  const end = phoneNumber.slice(-2);

  // 拼接中间部分的点
  const masked = `${start}···${end}`;

  return masked;
}

export function defaultAmount(phoneNumber) {
  return phoneNumber || "0.00";
}
