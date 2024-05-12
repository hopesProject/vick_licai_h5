module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 75,
      propList: ["*"],
      selectorBlackList: ["norem"],
      // 排除 vant 样式文件
      exclude: /node_modules\/vant\/lib\/index\.css/,
    },
  },
};
