/* eslint-disable camelcase, indent, sort-keys */

const { client, server } = require('./base')
const CopyPlugin = require('copy-webpack-plugin')
const F = require('ramda/src/F')
const HashOutputPlugin = require('webpack-plugin-hash-output')
const imageminGIFLossy = require('imagemin-giflossy')
const { default: ImageminPlugin } = require('imagemin-webpack-plugin')
const merge = require('merge-deep')
const { readFileSync } = require('fs')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const banner = readFileSync('config/banner.txt', { encoding: 'utf8' })

client
  .mode('development')

client.output
  .chunkFilename('ignota.com/js/[chunkhash].js')
  .filename('ignota.com/js/[chunkhash].js')
  .publicPath('/')
  .hashFunction('sha256')

client.module
  .rule('babel')
    .use('babel')
      .tap(options => merge(options, {
        plugins: [
          'graphql-tag',
          ['styled-components', {
            displayName: true,
            ssr: true,
          }],
        ],
      }))

client.module
  .rule('fonts')
    .use('file')
      .tap(options => merge(options, { name: 'ignota.com/fonts/[hash].[ext]' }))

client.module
  .rule('images')
    .use('file')
      .tap(options => merge(options, { name: 'ignota.com/img/[hash].[ext]' }))

client.module
  .rule('videos')
    .use('file')
      .tap(options => merge(options, { name: 'ignota.com/video/[hash].[ext]' }))

client
  .plugin('hashed-modules')
  .use(webpack.HashedModuleIdsPlugin, [
    { hashDigest: 'base64', hashDigestLength: 8, hashFunction: 'sha256' },
  ])

client
  .plugin('hash-output')
  .use(HashOutputPlugin)

client
  .plugin('define')
    .tap(args => [
      merge(args[0], {
        __DEV__: JSON.stringify(false),
        __STRUCTUR_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
        __TRYSTERO_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
        __WHOMST_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
      }),
    ])

client
  .plugin('banner')
  .use(webpack.BannerPlugin, [
    { banner, entryOnly: true, raw: true },
  ])

client
  .plugin('copy')
  .use(CopyPlugin, [
    [
      { force: true, from: 'images/favicon.ico', to: 'favicon.ico' },
      { force: true, from: 'pitch.html', to: 'pitch.html' },
    ],
  ])

client
  .plugin('stats')
  .use(StatsWriterPlugin, [
    { fields: null, filename: '../stats.json' },
  ])

server
  .mode('development')

server.output
  .publicPath('/')

server.module
  .rule('babel')
    .use('babel')
      .tap(options => merge(options, {
        plugins: [
          ['styled-components', {
            displayName: false,
            ssr: true,
          }],
          'graphql-tag',
        ],
      }))

server.module
  .rule('images')
    .use('file')
      .tap(options => merge(options, { emitFile: false, name: 'ignota.com/img/[hash].[ext]' }))

server.module
  .rule('videos')
    .use('file')
      .tap(options => merge(options, { emitFile: false, name: 'ignota.com/video/[hash].[ext]' }))

server
  .plugin('define')
    .tap(args => [
      merge(args[0], {
        __DEV__: JSON.stringify(false),
        __STRUCTUR_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
        __TRYSTERO_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
        __WHOMST_URI__: JSON.stringify('https://structur-api.dyck.mobi/'),
      }),
    ])

server
  .plugin('hashed-modules')
  .use(webpack.HashedModuleIdsPlugin, [
    { hashDigest: 'base64', hashDigestLength: 8, hashFunction: 'sha256' },
  ])

module.exports = [client.toConfig(), server.toConfig()]
