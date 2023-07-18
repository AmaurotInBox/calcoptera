import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import Pages from './pages'
import GlobalStyle from './components/GlobalStyle'

const uri = process.env.API_URI
const cache = new InMemoryCache()

const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true,
})

export default App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}
