import * as React from 'react'
import Head from 'next/head'
import { renderToString } from 'react-dom/server'
import { getMarkupFromTree } from 'react-apollo-hooks'
import ApolloClient from 'apollo-client'

import { initApollo } from './initApollo'
import { isBrowser } from './isBrowser'
import { AppContext } from 'next/app'

export const withApolloClient = (
  App: React.ComponentType<any> & { getInitialProps?: Function }
) => {
  return class Apollo extends React.Component {
    apolloClient: ApolloClient<any>

    static displayName = 'withApollo(App)'
    static async getInitialProps(appCtx: AppContext) {
      const { AppTree } = appCtx as { AppTree: any }

      let appProps = {}

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appCtx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(
        {},
        {
          // TODO: replace with actual code
          getToken: () => null,
        }
      )
      if (!isBrowser) {
        try {
          // Run all GraphQL queries
          await getMarkupFromTree({
            renderFunction: renderToString,
            tree: <AppTree {...appProps} apolloClient={apollo} />,
          })
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
      }
    }

    constructor(props: any) {
      super(props)
      this.apolloClient = initApollo(props.apolloState, {
        // TODO: replace with actual code
        getToken: () => null,
      })
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />
    }
  }
}
