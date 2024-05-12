// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'
const moment = require('moment-timezone')
// 设置时区为印度标准时间
moment.tz.setDefault('Asia/Kolkata')
/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      )
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function timeFormat(v) {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
}

export function _toLocaleString(
  number,
  showCurrencySymbol = true, // 是否显示货币符号，默认为 true
  locale = 'en-IN', // 默认使用印度英语的语言环境
  options = {
    // style：可选值为 decimal（小数）、currency（货币）或 percent（百分比）；
    // currency：设置为货币样式时使用的符号，支持列表在这里；
    // useGrouping：布尔值，是否显示数字分位。
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2 // 如果不想要显示末尾的小数「.00」，只要设置一下最小分位 minimumFractionDigits 即可（默认是 2）：
  }
) {
  number = number || 0
  number = Math.floor(number * 100) / 100 // 向下取整并保留两位小数

  let str = Number(number).toLocaleString(locale, options)
  if (showCurrencySymbol) {
    str = str.replace('₹', '')
  }
  return str
}
