// ./webpack.config.js
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  mode: "development",
  context: __dirname + "/src",
  entry: {
    app: "./app.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  target: "node",
  externalsPresets: {
    node: true,
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
