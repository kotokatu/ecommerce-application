const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintPlugin = require("eslint-webpack-plugin");

const baseConfig = {
  entry: path.resolve(__dirname, "./src/app"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: '[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      { test: /\.ts$/i, use: "ts-loader" },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // favicon: path.resolve(__dirname, './src/favicon.ico'),
      // filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: false,
      },
    }),
    new EslintPlugin({ extensions: "ts" }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
