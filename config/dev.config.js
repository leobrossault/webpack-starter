var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),
    StyleLintPlugin = require('stylelint-webpack-plugin'),
    HtmlWebpackPlugin =  require('html-webpack-plugin'),
    webpack = require('webpack'),
    HappyPack = require('happypack');

var happyThreadPool = HappyPack.ThreadPool({ size: 4 });

var commonsConf = {
  'loaders': [
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'happypack/loader?id=sass')
      // loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!sass!')
    },
    {
      test: /\.html$/,
      loaders: [
        'html-loader'
      ]
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['happypack/loader?id=babel']
    },
    {
      test: /\.woff$|\.woff2$|\.ttf$/,
      loaders: [
        'file?name=/assets/fonts/[name].[ext]'
      ]
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$|\.mp4$|\.svg$/,
      loaders: [
        'file?name=/assets/images/[name].[ext]'
        // 'image-webpack?optimizationLevel=7&interlaced=false' Not supported on staging.
      ]
    }
  ],
  'plugins': [
    new StyleLintPlugin({
      configFile: '.scss-lint.yml',
      files: ['**/*.s?(a|c)ss'],
      failOnError: false
    }),
    new HtmlWebpackPlugin({
      template: './app/templates/index.html'
    }),
    // new CommonsChunkPlugin('assets/js/index', 'assets/js/index.js'),
    new ExtractTextPlugin('assets/styles/styles.css'),
    new HappyPack({ id: 'babel', loaders: [
      'babel?presets[]=es2015'
    ],
    threadPool: happyThreadPool
    }),
    new HappyPack({ id: 'sass', loaders: [
        'css?importLoaders=2&sourceMap',
        'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      ],
      threadPool: happyThreadPool
    })
  ]
};

module.exports = commonsConf;
