const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')


module.exports = WebpackMerge(webpackConfig,{
    mode:'production',
    devtool:'cheap-module-source-map',
    plugins:[]
})
