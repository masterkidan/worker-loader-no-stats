const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const path = require("path");
module.exports = env => ({
    mode: "production",
    entry: ["./src/index.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
      },
    optimization: {
        providedExports: true,
        usedExports: true,
        sideEffects: true,
        concatenateModules: true,
        mergeDuplicateChunks: true,
        splitChunks: {
            minChunks: 2,
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 1,
            cacheGroups: {
                default: {
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /timeout\.worker\.(c|m)?js$/i,
                loader: 'worker-loader'
            },
        ],
    },
    plugins: env && env.analyzeWorker ? [
        new BundleAnalyzerPlugin({
            analyzerMode: "server",
            // analyzerHost: "172.17.86.172", // Set this option if you are running Docker/WSL
            analyzerPort: 8888,
            generateStatsFile: true,
            statsOptions: {
                chunkModules: true // allows usage with webpack-visualizer
            },
            logLevel: "silent"
        })
    ]: []
});
