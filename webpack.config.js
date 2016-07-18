var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin =  require('extract-text-webpack-plugin')
// var glob = require('glob')
var HappyPack = require('happypack')

var __DEV__ = process.env.NODE_ENV !== 'production'

var webpackConfig = {
    devtool:__DEV__?'cheap-source-map':'',
    debug:true,
    resolve:{
        root:path.join(__dirname,'src'),
        extensions:['','.js','.jsx','.css'],
        alias:{
            Promise:require('bluebird')            
        }
    },
    module:{}
}
/*
    Entry Points
*/
// var entryFiles = glob.sync('./src/entries/*.js')
// var entries = entryFiles.reduce(function(memoery,file){
//     var name = path.basename(file,'.js')
//     memoery[name] = __DEV__?[
//         'babel-polyfill',
//         name,
//         'webpack-hot-middleware/client?path=/__webpack_hmr'
//     ]:name
//     return memoery
// },{})
webpackConfig.entry = {
    app:__DEV__?[
        'babel-polyfill',
        path.join(__dirname,'./src/entries/index.js'),
        'webpack-hot-middleware/client?path=/__webpack_hmr'
    ]:path.join(__dirname,'./src/entries/index.js'),
    vendor:[
        'react',
        'react-redux',
        'react-router-redux',
        'react-router',
        'react-dom',
        'redux'
    ],
    // externals:[{
        // 'jquery':'window.jQuery'
    // }]
}
/*
  Bundle Output
*/
webpackConfig.output = {
    filename:'[name].js',
    path:path.join(__dirname,'dist'),
    publicPath:'/'
}
/*
   Plugins
 */
webpackConfig.plugins = [
    new HtmlWebpackPlugin({
        template:path.join(__dirname,'./src/entries/index.html'),
        hash:false,
        favicon:path.join(__dirname,'./src/static/favicon.ico'),
        inject:'body',
        minify:{
            collapseWhitespace:true
        }
    })
]
if(__DEV__){
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
            __DEV__:true
        }),
        new HappyPack({
            id:'js',
            threads:4
        })
   )
}else{
    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            __DEV__: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            }
        })
    )
}

webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin(
        'vendor','vendor.bundle.js'
    )
)
/** 
 * Loaders
*/
webpackConfig.module.loaders = [{
    test: /\.css$/,
    loader: 'style-loader!css-loader'
}, {
    test: /\.less$/,
    loader: 'style-loader!css-loader!less-loader'
},  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    include: path.resolve(__dirname, 'src'),
    loader: 'babel',
    happy: {id:'js'},
    query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: ['es2015', 'react', 'stage-0'],
        env: {
            development: {
                plugins: [
                    ['react-transform', {
                        transforms: [{
                            transform: 'react-transform-hmr',
                            imports: ['react'],
                            locals: ['module']
                        }, {
                            transform: 'react-transform-catch-errors',
                            imports: ['react', 'redbox-react']
                        }]
                    }],
                    ['antd',{
                        style:'css'
                    }]
                ]
            },
            production: {
                'presets': [
                    'react-optimize'
                ]
            }
        }
    }
}, {
    test: /\.json$/,
    loader: 'json'
}, {
    test: /\.woff(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
}, {
    test: /\.woff2(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
}, {
    test: /\.otf(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
}, {
    test: /\.ttf(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
}, {
    test: /\.eot(\?.*)?$/,
    loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
}, {
    test: /\.svg(\?.*)?$/,
    loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
}, {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
}]
//css not in js
if(!__DEV__){
    webpackConfig.module.loaders.filter(function(loader){
        loader.loaders && loader.loaders.find(function(name){
            return /css/.test(name.split('?')[0])
        }).forEach(function(loader){
            const [first, ...rest] = loader.loaders
            loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
            delete loader.loaders
        })
    })
    webpackConfig.plugins.push(
        new ExtractTextPlugin('[name].[contenthash].css', {
            allChunks: true
        })
    )
}

module.exports = webpackConfig