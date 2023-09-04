import { defaultDataIdFromObject, InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { canUseDOM } from 'exenv'
import { createHttpLink } from 'apollo-link-http'

function createStructurClient() {
  let initialState = {}
  if (!__DEV__ && canUseDOM && window.__STRUCTUR_STATE__ != null) {
    initialState = window.__STRUCTUR_STATE__
  }

  const cache = new InMemoryCache({
    dataIdFromObject: object => object.uuid ?? defaultDataIdFromObject(object),
  }).restore(initialState)

  const structurClient = new ApolloClient({
    cache,
    connectToDevTools: __DEV__,
    link: createHttpLink({
      fetchOptions: {
        mode: __SERVER_SIDE__ ? 'same-origin' : 'cors',
      },
      uri: __STRUCTUR_URI__,
    }),
    ssrMode: __SERVER_SIDE__,
  })

  return structurClient
}

function createTrysteroClient() {
  let initialState = {}
  if (!__DEV__ && canUseDOM && window.__TRYSTERO_STATE__ != null) {
    initialState = window.__TRYSTERO_STATE__
  }

  const cache = new InMemoryCache({
    dataIdFromObject: object => object.uuid ?? defaultDataIdFromObject(object),
  }).restore(initialState)

  const trysteroClient = new ApolloClient({
    cache,
    connectToDevTools: __DEV__,
    link: createHttpLink({
      fetchOptions: {
        mode: __SERVER_SIDE__ ? 'same-origin' : 'cors',
      },
      // FIXME: Use correct URI in production.
      uri: __STRUCTUR_URI__, // uri: __TRYSTERO_URI__,
    }),
    ssrMode: __SERVER_SIDE__,
  })

  return trysteroClient
}

function createWhomstClient() {
  let initialState = {}
  if (!__DEV__ && canUseDOM && window.__WHOMST_STATE__ != null) {
    initialState = window.__WHOMST_STATE__
  }

  const cache = new InMemoryCache({
    dataIdFromObject: object => object.uuid ?? defaultDataIdFromObject(object),
  }).restore(initialState)

  const whomstClient = new ApolloClient({
    cache,
    connectToDevTools: __DEV__,
    link: createHttpLink({
      fetchOptions: {
        mode: __SERVER_SIDE__ ? 'same-origin' : 'cors',
      },
      // FIXME: Use correct URI in production.
      uri: __STRUCTUR_URI__, // uri: __WHOMST_URI__,
    }),
    ssrMode: __SERVER_SIDE__,
  })

  return whomstClient
}

export default function createGraphQLClients() {
  return {
    structurClient: createStructurClient(),
    trysteroClient: createTrysteroClient(),
    whomstClient: createWhomstClient(),
  }
}
