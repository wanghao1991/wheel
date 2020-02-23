var path = require("path")
var webpack = require("webpack")
//var ExtractTextPlugin = require('extract-text-webpack-plugin') //css单独打包
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {

    return path.join(__dirname, '..', dir)
}

var webpackConfig = {

    module: {

        rules: [

            // babel-loader
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },

            // // 为了统计代码覆盖率，对 js 文件加入 istanbul-instrumenter-loader
            // {
            //     test: /\.(js)$/,
            //     exclude: /node_modules/,
            //     include: /src|packages/,
            //     enforce: 'post',
            //     use: [{
            //         loader: "istanbul-instrumenter-loader",
            //         options: {
            //             esModules: true
            //         },
            //     }]
            // },

            // vue loader
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        // 为了统计代码覆盖率，对 vue 文件加入 istanbul-instrumenter-loader
                        loaders: {
                            'scss': [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader'
                            ],
                            'sass': [
                                'vue-style-loader',
                                'css-loader',
                                'sass-loader?indentedSyntax'
                            ]
                        },
                        postLoaders: {
                            js: 'istanbul-instrumenter-loader?esModules=true'
                        }
                    }
                }]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [path.resolve(__dirname,'src/icons')],
                options: {
                    symbolId: 'icon-[name]'
                }
             },
            // css loader
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'), // 调用组件的时候方便点
        }
    },
    plugins: [
        new VueLoaderPlugin()   //15版本需指定plugin
    ],

    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             NODE_ENV: '"production"'
    //         }
    //     })
    // ]
}

module.exports = webpackConfig