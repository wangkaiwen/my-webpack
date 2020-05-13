const path=require('path');

const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
    entry: {
        vendor:['vue/dist/vue.esm.js']
    },
    output: {
        path: path.resolve(__dirname,'../public/js'),
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        new DllPlugin({
            path:path.resolve(__dirname,'../public/[name]-manifest.json'),
            name:'[name]',
            context: __dirname,
        })
    ]

}