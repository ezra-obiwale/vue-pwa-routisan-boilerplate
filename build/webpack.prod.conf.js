'use strict'

const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.prod-base.conf')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'barttar-client',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'dist/',
      // cache all static images and third-party assets
      // Note: files from https are different from those from http
      // @todo
      runtimeCaching: [
        // {
        //   urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
        //   handler: 'cacheFirst'
        // },
        // {
        //    urlPattern: /^https:\/\/(\d+)\.media\.tumblr\.com\//,
        //    handler: 'cacheFirst'
        // },
     ]
    })
  ]
});

module.exports = webpackConfig
