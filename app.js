#!/usr/bin/env node

const config = require('./config/webpack/development')
const v8 = require('v8')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

v8.setFlagsFromString('--max-old-space-size=8192')

const {
  PORT: port = 3636,
} = process.env

const OPTIONS = {
  disableHostCheck: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  hot: true,
  index: 'index.html',
  injectClient: true,
  injectHot: true,
  overlay: {
    errors: true,
    warnings: false,
  },
  port,
  public: 'com.ignota.here',
  serveIndex: true,
  // sockHost: 'com.ignota.here',
  // sockPort: 443,
  stats: 'minimal',
  transportMode: 'ws',
  watchOptions: {
    ignored: [
      /.git/,
      /node_modules/,
    ],
  },
}

WebpackDevServer.addDevServerEntrypoints(config, OPTIONS)

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, OPTIONS)

server.listen(port, () => {
  console.log(`Server listening on port: ${ port }!`)
})
