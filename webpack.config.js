var path = require('path');
var webpack=require('webpack');


const entryPath = "";
const entryFile = "app.jsx"
module.exports = {
    mode: 'development',
    //context: path.join(__dirname, 'js'),
    entry:[
        './' + entryPath + 'js/' + entryFile,
        './' + entryPath + 'scss/main.scss',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:9000/',
    ],
    output: {
        path: path.resolve(__dirname, entryPath + "/js"),
        filename: './js/out.js'
    },
    watch: true,
    module :{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",

                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './css/[name].css',
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ],


    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: path.join(__dirname,`${entryPath}`),
        // watchContentBase:true,
        publicPath: path.resolve(__dirname, "/"),
        compress: true,
        host:'0.0.0.0',
        liveReload:false,
        port: 9000
    }
};