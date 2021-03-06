var webpack = require('webpack'),
    path = require('path'),
    _ = require("lodash");

var entries = {},
    examples = require("./example.json");
_.each(examples, function(obj, name) {
    var entry = {};
    var entryJS = obj.path + obj.entryJS;
    var entryCSS = obj.path + obj.entryCSS;
    entry[name] = [
        // 'webpack-dev-server/client?http://localhost:9527',
        "webpack-hot-middleware/client",
        'webpack/hot/only-dev-server',
        entryCSS, entryJS
    ];
    _.extend(entries, entry);
});
// console.log(entries);
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, '../node_modules');

var babelrc = {
    "stage": 2,
    "env": {
        "development": {
            "plugins": [
                "react-transform"
            ],
            "extra": {
                "react-transform": {
                    "transforms": [{
                        "transform": "react-transform-hmr",
                        "imports": ["react"],
                        "locals": ["module"]
                    }]
                }
            }
        }
    }
};

module.exports = {
    entry: entries,
    module: {
        loaders: [{
            test: /\.json/,
            exclude: [node_modules_dir],
            loader: 'json'
        }, {
            test: /\.(es6|jsx)$/,
            exclude: [node_modules_dir],
            loader: 'babel',
            query: babelrc
        }, , {
            test: /\.html/,
            exclude: [node_modules_dir],
            loader: 'html'
        }, {
            test: /\.styl/,
            exclude: [node_modules_dir],
            loader: 'style!css!autoprefixer!stylus'
                // loader: ExtractTextPlugin.extract('style', 'css!sass!autoprefixer')
        }, {
            test: /\.css/,
            // exclude: [node_modules_dir],
            loader: 'style!css'
        }]
    },
    resolve: {
        extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js", ".json", ".coffee"]
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
        publicPath: "/public/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ vendorChunkName, /* filename= */ vendorFile),
        // new ExtractTextPlugin("modules/[name]/build/[name].css")
    ]
}
