const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

const name = () => (mode === "development" ? `[name]` : `[name].[contenthash]`);

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: mode,
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${name()}.js`,
    clean: true,
    publicPath: "",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: `./css/${name()}.css`,
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(j|t)s$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
