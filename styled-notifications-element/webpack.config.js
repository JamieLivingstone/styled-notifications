/*********************************
 * Environment and imports
 *********************************/
const environment = process.env.NODE_ENV || "development";
const path = require('path');

const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');//https://webpack.js.org/guides/output-management/#setting-up-htmlwebpackplugin
const CleanWebpackPlugin = require('clean-webpack-plugin');//https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder

/*********************************
 * Entry
 *********************************/
const entry = {
    "main": ["./src/main.js"]
};

/*********************************
 * Optimization
 *********************************/
const optimization = {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "common",
                chunks: "all" }
        }
    },
    occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
    //https://github.com/webpack/webpack/blob/master/examples/web-worker/webpack.config.js
};

/*********************************
 * Output
 *********************************/
const output = {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist'),
    pathinfo: true,
    publicPath: '/'
};

if (environment === "production") {
    output.filename = "[name].bundle.min.js";
    output.pathinfo = false;
}

/*********************************
 * HTML Snippet
 *********************************/
const headHtmlSnippet = `
<style>
  h2 {
    margin: 10vh auto;
    text-align: center;
  }
  tr {
    padding-top: 2vh;
  }
  .label {
    text-align: right;
  }
  .container {
    margin: 10vh auto;
  }
  .center {
    margin: auto;
  }
  .center-btn {
    text-align: center;
  }
</style>
`;

const bodyHtmlSnippet = `
<h2>Styled Notifications Element Demo</h2>
<styled-notifications-element id="notification1"></styled-notifications-element>
<div class="container">
  <table class="center">
    <tr>
      <td class="label"><label for="message">Message: </label></td>
      <td><input id="message" type="text" required>*Required</td>
    </tr>

    <tr>
      <td class="label"><label for="title">Title: </label></td>
      <td><input id="title" type="text"></td>
    </tr>

    <tr>
      <td class="label"><label for="theme">Theme: </label></td>
      <td>
        <select id="theme">
          <option value="">--</option>
          <option value="info">Info</option>
          <option value="error">Error</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
        </select>
      </td>
    </tr>

    <tr>
      <td class="label"><label for="position">Position: </label></td>
      <td>
        <select id="position">
          <option value="">--</option>
          <option value="nfc-top-left">Top-Left</option>
          <option value="nfc-top-middle">Top-Middle</option>
          <option value="nfc-top-right">Top-Right</option>
          <option value="nfc-bottom-left">Bottom-Left</option>
          <option value="nfc-bottom-middle">Bottom-Middle</option>
          <option value="nfc-bottom-right">Bottom-Right</option>
        </select>
      </td>
    </tr>

    <tr>
      <td class="label"><label for="duration">Display Notification Duration: </label></td>
      <td><input id="duration" type="number" value=3500></td>
    </tr>

    <tr>
      <td class="label"><label for="close">Close OnClick: </label></td>
      <td><input id="close" type="checkbox" checked></td>
    </tr>

    <tr>
      <td class="label"><label for="close-btn">Show Close Button: </label></td>
      <td><input id="close-btn" type="checkbox" checked></td>
    </tr>
  </table>
  <br>
  <div class="center-btn">
    <button id="send-btn" disabled>Send Notification</button>
  </div>
</div>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const notificationEl = document.querySelector('#notification1');
    const messageEl = document.querySelector('#message');
    const titleEl = document.querySelector('#title');
    const themeEl = document.querySelector('#theme');
    const positionEl = document.querySelector('#position');
    const durationEl = document.querySelector('#duration');
    const closeEl = document.querySelector('#close');
    const closeBtnEl = document.querySelector('#close-btn');
    const btnEl = document.querySelector('#send-btn');

    messageEl.addEventListener('input', (e) => {
      let val = e.path[0].value;
      if (val) {
        btnEl.disabled = false;
      } else {
        btnEl.disabled = true;
      }
    });

    btnEl.addEventListener('click', (e) => {
      e.preventDefault;

      let notification = {
        title: titleEl.value,
        message: messageEl.value,
        theme: themeEl.value,
        showDuration: durationEl.value ? parseInt(durationEl.value) : 3500,
        closeOnClick: closeEl.checked,
        displayCloseButton: closeBtnEl.checked,
        positionClass: positionEl.value ? positionEl.value : 'nfc-top-left'
      };

      notificationEl.notification = notification;
    });
  });
</script>
`;

/*********************************
 * Plugins
 *********************************/
const plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        // Required
        inject: false,
        // Optional
        template: require('html-webpack-template'),
        title: 'Styled-Notifications',
        mobile: true,
        minify: true,
        headHtmlSnippet: headHtmlSnippet,
        bodyHtmlSnippet: bodyHtmlSnippet
    }),
];

/*********************************
 * Resolve
 *********************************/
const resolve = {
    extensions: [".js"]
};

/*********************************
 * Devtool
 *********************************/
 const devtool = 'cheap-module-source-map';

/*********************************
 * Exports
 *********************************/
module.exports = {
    entry: entry,
    output: output,
    devtool: devtool,
    target: 'web',
    resolve: resolve,
    mode: environment,
    optimization: optimization,
    plugins: plugins,
};
