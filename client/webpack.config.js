
var webpack = require('webpack');
var path = require('path');

var gulp = require('gulp');
require('./gulpfile');

if (gulp.tasks.sass) {
    gulp.start('sass');
}

const DEV_SERVER_PORT = 3254;
const LOCAL_DEV_URL = '0.0.0.0';

var commonsPlugin =
    new webpack.optimize.CommonsChunkPlugin({ name: 'common'});

var config = {
    entry: {
        'main': './src/shells/main/index.tsx',
        common: [
        ]
    },

    output: {
        filename: './js/[name].js',
        chunkFilename: './js/[name].chunk.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: process.env.NODE_ENV === 'localhost' || process.env.NODE_ENV === undefined ?
            `http://${LOCAL_DEV_URL}:${DEV_SERVER_PORT}/` : `https://${process.env.CLIENT_URL}/`
    },
    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [/joi-browser/, /node_modules/, /__tests__/] // TODO: See if this is needed?
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: [
                    path.resolve('./src'),
                    path.resolve('./test')
                ],
                exclude: [/joi-browser/, /node_modules/, /__tests__/]
            },
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                include: [
                    path.resolve('./src'),
                    path.resolve('./test')
                ],
                exclude: [
                    /joi-browser/,
                    /node_modules/,
                    /__tests__/
                ]
            },
            {
                test: /\.scss$/, 
                use: [{
                    loader: 'css-loader', 
                    options: {
                        modules: true
                    }
                }, 'sass-loader']
            },
            { 
                test: /\.(png|jpg)$/, 
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    },
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(html)$/, 
                use: {
                    loader: 'file-loader?name=[name].[ext]'
                }
            },
            { 
                test: /\.(eot|woff|woff2|ttf|svg)$/, 
                use: {
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }
            }
        ]
    },
// TODO: This is a potential performance improvement we can make?
/*
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"        
    }
*/
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.jsx', '.js']
    },

    devtool: '#inline-source-map',

    plugins: [
        commonsPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],

    devServer: {
        port: DEV_SERVER_PORT,
        publicPath: '/',
        host: process.env.NODE_ENV === 'localhost' ? '0.0.0.0' : LOCAL_DEV_URL,
        stats: 'minimal'
    },

    node: {
        crypto: 'empty',
        net: 'mock',
        dns: 'mock'
    }
};

// NOTE: "staging" may need to change to handle blue/green NODE_ENV
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

console.log('node_env: ' + process.env.NODE_ENV); //eslint-disable-line

module.exports = config;