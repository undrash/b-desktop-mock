
const path      = require( "path" );




module.exports = {
    context: path.join( __dirname, "src/pages" ),
    entry: {
        index: "./index/Index.ts"
    },
    mode: "production",
    module: {
        rules: [
            { test: /\.html$/, use: "html-loader" },
            { test: /\.js$/, loader: "source-map-loader", enforce: "pre" },
            { test: /\.ts$/, loader: "ts-loader", options: { configFile: "tsconfig.json" } },
            { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
            { test: /\.(jpg|png|svg|gif)$/, use: { loader: "file-loader", options: { name: "[name].[ext]", outputPath: "./img/", publicPath: "./public/img" } } },
            { test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/, use: { loader: "file-loader", options: { name: "[name].[ext]", outputPath: "./fonts/", publicPath: "./public/fonts" } } },
        ]
    },
    resolve: {
        extensions: [
            ".ts",
            ".js"
        ],
        alias: {
            "TweenLite": "node_modules/gsap/src/uncompressed/TweenLite"
        }
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve( __dirname, "./preload" )
    }

};