import { ApolloClient, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'

const uri = import.meta.env.VITE_GRAPHQL_ENDPOINT ?? '/graphql'

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache(),
})
