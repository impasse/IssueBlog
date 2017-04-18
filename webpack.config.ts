import * as path from 'path'
import * as process from 'process'

import * as webpack from 'webpack'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import * as OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'

import * as autoprefixer from 'autoprefixer-stylus'
import * as nib from 'nib'

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

module.exports = {
    context: path.resolve(__dirname, 'src/'),
    entry: {
        app: './index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/',
        filename: 'js/[name].[hash:8].js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/i,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/i,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.styl$/i,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'stylus-loader',
                            options: {
                                use: [
                                    nib,
                                    autoprefixer('last 2 versions')
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(xml|html|txt|md)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(webp|jpe?g|png|gif)(\?.*)?$/i,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    outputPath: 'img/'
                }
            },
            {
                test: /\.(svg|woff2?|ttf|eot)(\?.*)?$/i,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    outputPath: 'font/'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/'], {
            verbose: false
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('css/[name].[hash:8].css'),
        new OptimizeCSSPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            inject: true,
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return module.context && module.context.indexOf('node_modules') > -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new FriendlyErrorsPlugin(),
        // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    ],
    devtool: NODE_ENV === 'production' ? '#source-map' : '#cheap-module-source-map',
    devServer: {
        port: process.env.PORT || 8080,
        host: 'localhost',
        publicPath: '/',
        contentBase: './src',
        historyApiFallback: true,
        open: true,
        proxy: {

        }
    }
}
