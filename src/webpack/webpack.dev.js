const common = require("./webpack.config");
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const ROOTPATH = resolve(__dirname, "../../");

module.exports = merge(common, {
  // 运行模式 开发模式和production产品模式
  mode: "development",
  // 配置插件的节点
  // 自动打包运行
  // 指令：npx webpack-dev-server
  devServer: {
    contentBase: resolve(ROOTPATH, "build"),
    compress: true,
    port: 4399,
    // open: true,
  },
});
