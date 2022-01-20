const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "main.[hash].js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "images/[name].[hash][ext]",
  },
  plugins: [new CleanWebpackPlugin()],
});
