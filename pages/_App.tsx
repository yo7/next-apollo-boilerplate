import React from 'react'
import NextApp, { Container } from 'next/app'
import { withApolloClient } from '../lib/withApolloClient'
import { ApolloProvider } from 'react-apollo-hooks'
import ApolloClient from 'apollo-client'

class App extends NextApp<{ apolloClient: ApolloClient<any> }> {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(App)
