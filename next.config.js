const webpack = require('webpack')
module.exports = {
  reactStrictMode: true,
  //...
webpack: (config) => {

  config.resolve.alias.stream = 'stream-browserify';
  config.resolve.alias.zlib = 'browserify-zlib';

  return config;
},
}
