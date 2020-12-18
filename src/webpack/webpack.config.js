const { resolve } = require("path");
//自动清除包
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//导入在内存中生成 html页面的插件
//只要是插件，就一定要放到 plugins 节点中去
//这个插件的两个作用：
// 1.自动在内存中根据指定页面生成一个内存的页面
// 2.自动把打包好的 bundle.js 追加到页面中去
const HtmlWebpackPlugin = require("html-webpack-plugin");
//这个配置文件，其实就是一个JS文件，通过 Node中的模块操作，向外暴露了一个配置对象

const ROOTPATH = resolve(__dirname, "../../");

module.exports = {
  // 入口，表示webpack打包哪个文件
  entry: "./src/render/index.jsx",
  devtool: "inline-source-map",
  //输出相关文件的配置
  output: {
    //这是指定输出文件的名称
    filename: "[name].[contenthash].js",
    //指定打包好的文件，输出到哪个目录中去
    path: resolve(ROOTPATH, "./dist"),
  },
  target: "web",
  //这个节点用于配置所有第三方模块加载器
  module: {
    //所有第三方模块的匹配规则
    rules: [
      {
        //匹配哪些文件
        test: /\.less$/,
        exclude: /node_modules/,
        //使用哪些loader进行处理
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',   // 放在后面的先被解析
          options: {
              // minimize: true,
              // modules: true,
              // localIdentName: '[path][name]_[local]_[hash:base64:5]'       

          }
        }, "less-loader"],
      },
      // {
      //   ///配置处理 .css 文件的第三方loader 规则
      //   test: /\.css$/,
      //   //使用哪些loader进行处理
      //   use: ["style-loader", "css-loader"],
      // },
      {
        // 处理图片资源,但是处理不了html中img的路径问题//处理图片路径的 loader
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: "url-loader",
        options: {
          // limit 是给定的值，是图片的大小，单位是byte，如果我们引用的图片大于或等于给定给定的limit值，
          // 则不会转化为base64格式的字符串，如果图片小于给定的limit值，则图片就会被转化为base64格式的字符串

          limit: 8 * 1024,
          // 关闭es6
          esModule: false,
          name: "[hash:10].[ext]", //不重复名字
        },
      },
      {
        //处理字体文件的 loader
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: "url-loader",
      },
      {
        //配置 Babel 来转换高级的ES语法
        test: /\.(js|jsx)$/,
        use: {
          
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      //   {
      //     // 打包其他资源
      //     exclude: /\.(css|js|html)$/,
      //     loader: "file-loader",
      //   },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@components": resolve(ROOTPATH, "src/render/components/"),
      "@": ROOTPATH,
    },
  },
  plugins: [
    // 一般这个插件是配合 webpack -p 这条命令来使用，
    // 就是说在为生产环境编译文件的时候，先把 build或dist(就是放生产环境用的文件) 目录里的文件先清除干净，再生成新的。
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      //指定模板页面，将来会根据指定的模板页面路径去生成内存中的页面
      template: resolve(ROOTPATH, "public/index.html"),
      //指定生成页面的名称
      filename: "index.html",
      minify: {
        // 压缩html
        collapseWhitespace: true, // 空格
      },
    }),
  ],
};
