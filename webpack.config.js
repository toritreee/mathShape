const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app.tsx",
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist/build"]
    }),
    new HtmlWebpackPlugin({
      template: "src/templates/index.html"
    }),
  ],
  output: {
    path: __dirname + "/dist",
    filename: "build/[name].[contenthash].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader"}
    ],
  }
}