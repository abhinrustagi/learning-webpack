const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[hash].bundle.js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "images/[name].[hash][ext]",
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin(),new TerserWebpackPlugin(), new HTMLWebpackPlugin({template: "./src/template.html",minify:{removeAttributeOptions:true,collapseWhitespace:true,removeComments:true}})],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({ filename: "[name].[hash].css" }),
    new CleanWebpackPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }),
    }), 
  ],
});
