"use strict";
const path = require("path");
// const defaultSettings = require("./src/settings.js");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "vue Element Admin"; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = 8000; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    client: {
      overlay: false,
    },
    port: port,
    open: true,
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"), // This line is important!
      },
    },
  },
  chainWebpack: (config) => {
    // 1. Exclude the default svg rule.
    config.module.rule("svg").exclude.add(resolve("src/icons"));

    // 2. Include the svg directory for svg-sprite-loader.
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
};
