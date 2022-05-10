const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isLocal = process.env.LOCAL === 'true'

module.exports = {
  mode: isLocal ? 'production' : 'development', // 表示webpack打包环境是开发环境还是生产环境
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包公共模块
        commons: {
          chunks: 'initial', // initial表示提取入口文件的公共部分
          minChunks: 2, // 表示提取公共部分最少的文件数
          minSize: 0, // 表示提取公共部分最小的大小
          name: 'commons', // 提取出来的文件命名
        },
      },
    },
  },
  performance: {
    // 性能
    hints: 'warning', // false关闭
    maxEntrypointSize: 100000000, // 最大入口文件大小
    maxAssetSize: 100000000, // 最大资源文件大小
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(['.js'])
    },
  },
  entry: './src/index.js', // 项目的入口文件，路径相对于项目的根路径
  // 配置输出信息
  output: {
    filename: 'bundle.js', // 打包输出文件名，后期可改成按规则动态生成
    path: path.resolve(__dirname, './dist'), // 输出的路径，路径是当前目录
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    // 实例化Html模板
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
  module: {
    rules: [
      {
        // 配置babel-loader
        test: /\.js/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, './src'),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          // file-loader打包的图片或文件会生成一个随机的hash值作为图片名字，url-loader封装了file-loader，文件大小小于limit，url-loader会把文件转为base64,大于limit则调用file-loader进行处理，参数也会直接传给file-loader
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname, './src'),
      pages: path.join(__dirname, './src/pages'),
      components: path.join(__dirname, './src/components'),
      actions: path.join(__dirname, './src/redux/actions'),
      reducers: path.join(__dirname, './src/redux/reducers'),
      images: path.join(__dirname, './src/images'),
    },
  },
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    static: './dist',
    historyApiFallback: true, // 解决启动后刷新404
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': '/api',
        },
        changeOrigin: true, // 让target参数是域名
        secure: false,// 设置支持https协议代理
      },
    },
  },
}
