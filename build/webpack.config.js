const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const devMode = process.argv.indexOf('--mode=production') === -1;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname,'../src/main.js'),
    output: {
        filename: "js/[name].[hash].js",
        path:path.resolve(__dirname,'../dist'),
        chunkFilename:'js/[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                use: ["vue-loader"]
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            ['@babel/preset-env']
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use: [{
                    loader: devMode?'vue-style-loader':MiniCssExtractPlugin.loader,
                    options: {
                        hmr:devMode,
                        publicPath:'../'
                    }
                },'css-loader']
            },
            {
                test:/\.less$/,
                use: [{
                    loader: devMode?'vue-style-loader':MiniCssExtractPlugin.loader,
                    options: {
                        hmr:devMode,
                        publicPath:'../'
                    }
                },'css-loader','less-loader']
            },
            {
                test:/\.(jpe?g|png|gif)$/,
                use:{
                    loader:'file-loader',
                    options:{
                        name:'img/[name].[ext]',
                        esModule:false
                    }
                }
            },
        ]
    },
    plugins: [
        new vueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            publicPath:'./',
            filename:'index.html',
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../public/vendor-manifest.json')
        }),
        new CopyWebpackPlugin([{
            from:path.resolve(__dirname,'../public'),
            to:path.resolve(__dirname,'../dist')
        }]),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
        },
        extensions: [".js", ".json",".vue"]
    },
    performance: {
        maxAssetSize: 1024000
    }

}
