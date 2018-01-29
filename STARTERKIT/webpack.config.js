const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: () => {
    return glob.sync('./assets/src/scripts/**/*.entry.{js,jsx,ts,tsx}').reduce((acc, file) => {
      const extension = path.extname((file));
      const filename = path.basename(file, extension).replace(/\.entry/, '');
      acc[filename] = file;
      return acc;
    }, {});
  },
  output: {
    path: path.resolve(__dirname, 'assets', 'dist', 'scripts'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [
      ".webpack.js", ".web.js",
      ".ts", ".tsx",
      ".js", ".jsx",
    ]
  },
  externals: {
    drupal: "Drupal"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => /node_modules/.test(module.context),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
  ]
};

// Set production build specific settings.
if (process.env.NODE_ENV === 'production') {

  const productionPlugins = [
    new UglifyJsPlugin({
      parallel: 4,
      sourceMap: true,
      uglifyOptions: {
        mangle: false,
      }
    })
  ];

  config.plugins = config.plugins.concat(productionPlugins);

}

module.exports = config;
