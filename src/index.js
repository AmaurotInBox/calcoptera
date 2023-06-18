require('dotenv').config()

const express = require('express')

const { ApolloServer } = require('apollo-server-express')

const db = require('./db')
const models = require('./models')
const DB_HOST = process.env.DB_HOST
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const PORT = process.env.PORT || 4000

db.connect(DB_HOST)

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { models }
    },
  })
  const app = express()
  await server.start()
  server.applyMiddleware({ app, path: '/api' })

  app.listen(PORT, () => {
    console.log(
      `GraphQL Server running at http://127.0.0.1:${PORT}${server.graphqlPath}`
    )
  })
}

startApolloServer(typeDefs, resolvers)
