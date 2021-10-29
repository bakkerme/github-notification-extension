var ZipPlugin = require('zip-webpack-plugin');

const baseConfig = require('./webpack.config');
module.exports = {
    ...baseConfig,
    mode: 'production',
    plugins: [
        ...baseConfig.plugins,
        new ZipPlugin({
            path: '../out',
            extension: 'crx',
            filename: 'notifications-for-github',
        })
    ],
}