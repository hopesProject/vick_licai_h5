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
