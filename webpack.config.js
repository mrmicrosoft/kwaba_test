var path = require("path");

module.exports = {
    entry: "./src/App.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "kwaba.js"
    },
    mode:"production",
    module: {
        rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
    }
};