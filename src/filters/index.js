// import parseTime, formatTime and set to filter
const moment = require("moment-timezone");
// 设置时区为印度标准时间
// moment.tz.setDefault("Asia/Kolkata");

export function _timeFormat(v, format = "YYYY-MM-DD HH:mm:ss") {
  return moment(v).format(format);
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
