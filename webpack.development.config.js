const baseConfig = require('./webpack.config')

module.exports = {
    ...baseConfig,
    mode: 'development',
  watch: true,
  devtool: 'cheap-source-map',
}