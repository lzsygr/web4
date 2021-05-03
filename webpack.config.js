const {resolve} = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const myWebpackConfig = {
  mode:'development',
  entry: {
     main: "./src/index.js"
  },
  output: {
     filename: "built.js",
     path: resolve(__dirname, "build")
    // publicPath:'/dist/' // 这里要配置，否则异步模块报错
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ],
  module: {
    rules: [
      // 各个loaders的配置
        {
          test: /\.css$/,
          // 使用哪些loader进行处理
          use: [
            // 追加style标签内嵌样式到页面
            'style-loader',
            // 将css文件变成CommonJS模块致使可以在js中加载
            // 里面的内容是样式字符串
            'css-loader'
          ],
        },
        {
          test: /\.less$/i,
          loader: [
            // compiles Less to CSS
            "style-loader",
            "css-loader",
            "less-loader"
          ]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          loader: 'url-loader',
          options: {
            // 图片小于8kb，被被作为base64处理
            // url-loader依赖file-loader
            limit: 8 * 1024,
            esModule:false,
            name:'[hash:10].[ext]'
          }
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name:'[hash:10].[ext]'
          }
       },
       {
         test: /\.html$/i,
         loader: 'html-loader'
       }



    //   {
    //     test: /\.js$/,
    //     loader: 'babel-loader',
    //     include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
    //   }
    ]
  }
};

module.exports = myWebpackConfig;
