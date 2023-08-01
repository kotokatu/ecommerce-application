const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 9000,
    client: {
        overlay: false,
      },
  },
  optimization: {
    runtimeChunk: "single",
  },
};
