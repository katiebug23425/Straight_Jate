const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      database: "./src/js/database.js",
      editor: "./src/js/editor.js",
      header: "./src/js/header.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // webpack plugin to generate an HTML file to serve the bundle
      new HtmlWebpackPlugin({
        title: "Straight Jate",
        template: "./index.html",
      }),
      // Injects a service worker into the app bundle
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "sw.js",
      }),
      // webpack plugin to generate a manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Straight Jate",
        short_name: "Jate",
        description: "Just Another Text Editor, A simple note-taking app",
        background_color: "#ffffff",
        theme_color: "#2196f3",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      // css loader
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        // babel loader
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
