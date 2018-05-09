var path = require("path")
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: 'localhost',
    compress: true,
    port: 8099
  },
  module: {
    rules: [
      {
        test: /(\.js)|(\.ts)|(\.jsx)|(\.tsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /(\.ts)|(\.tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
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
  }
}  