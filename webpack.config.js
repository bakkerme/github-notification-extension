const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    serviceWorker: './src/service-worker.js',
    options: './src/options.js',
  },
  // This will output a single file under `dist/bundle.js`
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'extension'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/html/*", to: "./[name][ext]" },
        { from: "src/manifest.json", to: "./[name][ext]" },
      ],
    }),
  ],
}