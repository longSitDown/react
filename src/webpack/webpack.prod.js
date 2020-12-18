const common = require('./webpack.config')
const {merge} = require('webpack-merge')

module.exports=merge(common,{
    // 运行模式 开发模式和production产品模式
  mode: "production",
  plugins: [
    // 一般这个插件是配合 webpack -p 这条命令来使用，
    // 就是说在为生产环境编译文件的时候，先把 build或dist(就是放生产环境用的文件) 目录里的文件先清除干净，再生成新的。
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
  ],
})
