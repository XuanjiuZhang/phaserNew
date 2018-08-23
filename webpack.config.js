var path = require("path")
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: 'localhost',
    compress: true,
    port: 8099
  },
  context: path.join(__dirname, 'src'),
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    alias: { 
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less']
  },
  entry: {
    app: './index.ts'   
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /(\.js)|(\.jsx)|(\.ts)|(\.tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0', "mobx"],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'img/styleResource/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./src/lib/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin(
      {
        hash: true,
        inject: true,
        chunks: ['app'],
        template: 'index.html',
        filename: 'index.html'
    })
  ]
}  