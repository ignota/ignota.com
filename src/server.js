import { Route, StaticRouter } from 'react-router'
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components'
import { App } from 'app/routes'
import { configureStore } from 'app/flux'
import etag from 'etag'
import fetch from 'node-fetch'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { Helmet } from 'react-helmet'
import Koa from 'koa'
import path from 'path'
import { Provider } from 'react-redux'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Router from 'koa-router'
import serve from 'koa-static'
import { setAutoFreeze } from 'immer'
import { theme } from 'app/styles'

global.fetch = fetch

setAutoFreeze(__DEV__)

const getRootComponent = ({ context, ctx, sheet, store }) =>
  <Provider store={ store }>
    <StyleSheetManager sheet={ sheet.instance }>
      <ThemeProvider theme={ theme }>
        <StaticRouter context={ context } location={ ctx.path }>
          <Route>
            { props => <App { ...props } /> }
          </Route>
        </StaticRouter>
      </ThemeProvider>
    </StyleSheetManager>
  </Provider>

function getServerRenderer({ clientStats }) {
  return async ctx => {
    const context = {}
    const {
      rootTask,
      store,
      structurClient,
      trysteroClient,
      whomstClient,
    } = configureStore()
    let sheet = new ServerStyleSheet()

    try {
      let reactBody = renderToString(
        getRootComponent({
          context,
          ctx,
          sheet,
          store,
        }),
      )

      store.close()
      await rootTask.toPromise()

      if (context.redirect) {
        return ctx.redirect(context.redirect)
      }

      sheet = new ServerStyleSheet()

      reactBody = renderToString(
        getRootComponent({
          context,
          ctx,
          sheet,
          store,
        }),
      )

      const { scripts } = flushChunks(clientStats, {
        chunkNames: flushChunkNames(),
      })

      const helmet = Helmet.renderStatic()

      const reduxState = JSON.stringify(store.getState())
      const structurState = JSON.stringify(structurClient.extract())
      const trysteroState = JSON.stringify(trysteroClient.extract())
      const whomstState = JSON.stringify(whomstClient.extract())

      const body = `
        <!doctype html>
        <html ${ helmet.htmlAttributes }>
          <head>
            ${ helmet.meta }
            ${ helmet.link }
            ${ helmet.base }
            ${ helmet.title }
            ${ sheet.getStyleTags() }
            ${ helmet.script }
            ${ helmet.style }
            ${ helmet.noscript }
          </head>
          <body>
            <main>${ reactBody }</main>
            <script>
              window.__STRUCTUR_STATE__ = ${ __DEV__ ? '{}' : structurState };
              window.__TRYSTERO_STATE__ = ${ __DEV__ ? '{}' : trysteroState };
              window.__WHOMST_STATE__ = ${ __DEV__ ? '{}' : whomstState };
              window.__REDUX_STATE__ = ${ __DEV__ ? '{}' : reduxState };
            </script>
            ${ scripts.map(b => `<script defer crossorigin='anonymous' src='${ path.join(clientStats.publicPath, b) }'></script>`).join('') }
          </body>
        </html>
      `

      ctx.set('ETag', etag(body))

      const links = scripts.map(b => `</${ b }>; rel=preload; as=script`).join(',')
      ctx.set('Link', links)

      ctx.status = context.statusCode || 200

      if (ctx.fresh) {
        ctx.status = 304
        return
      }

      ctx.set('Cache-Control', 'max-age=900')
      ctx.type = 'text/html; charset=utf-8'
      ctx.body = body
    } catch (err) {
      console.error(err)
      ctx.throw(500, err)
    }
  }
}

if (__DEV__) {
  module.exports = getServerRenderer
} else {
  const clientStats = require('./stats.json')

  const {
    PORT = 3000,
  } = process.env

  const app = new Koa()
  const router = new Router()

  router.all('/ping', async ctx => {
    ctx.status = 200
    ctx.body = 'pong'
  })

  router.get('/public/*', serve('.'))

  router.get('/*', getServerRenderer({ clientStats }))

  app.use(router.routes())

  app.listen(PORT)
}
