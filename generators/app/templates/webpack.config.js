const path = require('path')
const fs = require('fs')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '<%= props.libraryName.kebabCase %>.js',
    library: '<%= props.libraryName.umd %>',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new DtsBundlePlugin()
  ]
}

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', function() {
        var dts = require('dts-bundle');

        dts.bundle({
            name: '<%= props.libraryName.umd %>',
            main: 'dist/index.d.ts',
            out: 'index.d.ts',
            removeSource: true,
            outputAsModuleFolder: true,
            verbose: true
        });

        // Add 'export as namespace' to declaration file for the UMD module
        fs.appendFile('dist/index.d.ts', 'export as namespace <%= props.libraryName.umd %>', (err) => {
          if (err) {
              throw err
          }
      })
    });
};
