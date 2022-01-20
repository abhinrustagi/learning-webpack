const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "images/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },{
        test:/\.css$/,
        use:["css-loader"]
      }
    ],
  },
  plugins: [new HTMLWebpackPlugin({ template: "./src/template.html" })],
});
