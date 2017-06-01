module.exports = {

    // Configure multiple bundles as required.
    entry: {
        client: "./src/client/client.entry.ts"
    },

    output: {
        // [name] comes from the `entry` key above.
        filename: "[name]-application.js",
        publicPath: "http://localhost:8081/js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },

    module: {
        rules: [
            // Transpile all ts files to js.
            { test: /\.ts$/, loader: "ts-loader" },

            // Re-process all .js files with the sourcemap loader (for debugging against original ts files).
            { enforce: 'pre', test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // Don't add to bundle, assume named external is accessible through global.
    externals: { 
        // E.g. "matter-js": "Matter"
    }
};