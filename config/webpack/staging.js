/* eslint-disable camelcase, indent, sort-keys */

const { client, server } = require('./base')
const { contentType } = require('mime-types')
const CopyPlugin = require('copy-webpack-plugin')
const F = require('ramda/src/F')
const HashOutputPlugin = require('webpack-plugin-hash-output')
const imageminGIFLossy = require('imagemin-giflossy')
const { default: ImageminPlugin } = require('imagemin-webpack-plugin')
const merge = require('merge-deep')
const OptimizeJSPlugin = require('optimize-js-plugin')
const path = require('path')
const { readFileSync } = require('fs')
const S3Plugin = require('webpack-s3-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const banner = readFileSync('config/banner.txt', { encoding: 'utf8' })

client
  .mode('none')

client.output
  .crossOriginLoading('anonymous')
  .chunkFilename('ignota.com/js/[chunkhash].js')
  .filename('ignota.com/js/[chunkhash].js')
  .pathinfo(false)
  .publicPath('https://ignota-staging-app-cdn-20190718021207090000000001.s3.amazonaws.com/ass/')
  .hashFunction('sha256')

client.module
  .rule('babel')
    .use('babel')
      .tap(options => merge(options, {
        plugins: [
          'closure-elimination',
          'graphql-tag',
          'react-local',
          ['styled-components', {
            displayName: false,
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
        __STRUCTUR_URI__: JSON.stringify('https://api.structur.stage.ignota.toys/'),
        __TRYSTERO_URI__: JSON.stringify('https://api.structur.stage.ignota.toys/'),
        __WHOMST_URI__: JSON.stringify('https://whomst.stage.ignota.toys/'),
        'process.env.NODE_ENV': JSON.stringify('staging'),
      }),
    ])

client
  .plugin('optimize-js')
  .use(OptimizeJSPlugin, [
    { sourceMap: false },
  ])

client
  .plugin('imagemin')
  .use(ImageminPlugin, [
    {
      plugins: [
        imageminGIFLossy({
          lossy: 80,
          optimizationLevel: 2,
        }),
      ],
      pngquant: {
        speed: 3,
      },
    },
  ])

client
  .plugin('banner')
  .use(webpack.BannerPlugin, [
    { banner, entryOnly: false, raw: true },
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
  .plugin('s3')
  .use(S3Plugin, [
    {
      basePath: 'ass',
      exclude: path => /\.(html|json)$/.test(path),
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      s3UploadOptions: {
        ACL: 'public-read',
        Bucket: 'ignota-staging-app-cdn-20190718021207090000000001',
        CacheControl: 'public, max-age=31536000',
        ContentType: filename => contentType(path.basename(filename)) || 'application/octet-stream',
      },
    },
  ])

client
  .plugin('stats')
  .use(StatsWriterPlugin, [
    { fields: null, filename: '../stats.json' },
  ])

client.optimization
  .minimizer('terser')
  .use(TerserPlugin, [
    {
      parallel: 4,
      terserOptions: {
        compress: {
          negate_iife: false,
        },
        mangle: true,
        output: {
          comments: /The Ignota Media Corporation/,
          ecma: 5,
        },
        safari10: true,
        toplevel: true,
      },
      warningsFilter: F,
    },
  ])

client.optimization
  .concatenateModules(true)
  .flagIncludedChunks(true)
  .mergeDuplicateChunks(true)
  .minimize(true)
  .occurrenceOrder(true)
  .providedExports(true)
  .removeEmptyChunks(true)
  .runtimeChunk(true)
  .sideEffects(true)
  .splitChunks({
    chunks: 'all',
    name: true,
  })
  .usedExports(true)

server
  .mode('none')

server.output
  .pathinfo(false)
  .publicPath('https://ignota-staging-app-cdn-20190718021207090000000001.s3.amazonaws.com/ass/')

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
        __STRUCTUR_URI__: JSON.stringify('https://api.structur.stage.ignota.toys/'),
        __TRYSTERO_URI__: JSON.stringify('https://api.structur.stage.ignota.toys/'),
        __WHOMST_URI__: JSON.stringify('https://whomst.stage.ignota.toys/'),
        'process.env.NODE_ENV': JSON.stringify('staging'),
      }),
    ])

server
  .plugin('hashed-modules')
  .use(webpack.HashedModuleIdsPlugin, [
    { hashDigest: 'base64', hashDigestLength: 8, hashFunction: 'sha256' },
  ])

server.optimization
  .minimizer('terser')
  .use(TerserPlugin, [
    {
      parallel: 4,
      terserOptions: {
        compress: {
          negate_iife: false,
        },
        mangle: true,
        output: {
          ecma: 6,
        },
        toplevel: true,
      },
      warningsFilter: F,
    },
  ])

server.optimization
  .concatenateModules(true)
  .flagIncludedChunks(true)
  .mergeDuplicateChunks(true)
  .minimize(true)
  .occurrenceOrder(true)
  .removeEmptyChunks(true)
  .sideEffects(true)
  .usedExports(true)

module.exports = [client.toConfig(), server.toConfig()]
