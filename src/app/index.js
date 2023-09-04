import { hydrate, render } from 'react-dom'
import Analytics from 'app/components/analytics'
import { configureStore } from 'app/flux'
import { ConnectedRouter } from 'connected-react-router'
import { history } from 'app/lib'
import { Provider } from 'react-redux'
import React from 'react'
import { Route } from 'react-router'
import { theme } from 'app/styles'
import { ThemeProvider } from 'styled-components'

const renderer = __DEV__
  ? render
  : hydrate

const main = document.querySelector('main') || do {
  const el = document.createElement('main')
  const body = document.querySelector('body')
  body.appendChild(el)
}

const { store } = configureStore()

const renderComponent = Component =>
  renderer(
    <Provider store={ store }>
      <ThemeProvider theme={ theme }>
        <ConnectedRouter history={ history }>
          <Route>
            { props => (
              <Analytics>
                <Component { ...props } />
              </Analytics>
            ) }
          </Route>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>,
    main,
  )

;(() => {
  const { App } = require('app/routes')
  renderComponent(App)
})()

if (module.hot) {
  module.hot.accept(['app/flux', 'app/lib', 'app/routes', 'app/styles'], () => {
    const { App } = require('app/routes')
    renderComponent(App)
  })
}
