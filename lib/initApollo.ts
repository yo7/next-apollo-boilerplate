import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import { isBrowser } from './isBrowser'

// TODO: get through env var or replace with value
const uri = process.env.HOST

// Polyfill fetch on the server for apollo-client
if (isBrowser) {
  // @ts-ignore
  global.fetch = fetch
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

type AuthOptions = { getToken: () => string | null }

const createClient = (
  initialState: NormalizedCacheObject,
  { getToken }: AuthOptions
) => {
  const httpLink = createHttpLink({
    uri,
    credentials: 'same-origin',
  })

  const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export const initApollo = (
  initialState: NormalizedCacheObject,
  options: AuthOptions
) => {
  // Create a new client for every server-side request
  if (!isBrowser) {
    return createClient(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createClient(initialState, options)
  }

  return apolloClient
}
