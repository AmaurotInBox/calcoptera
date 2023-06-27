require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

const db = require('./db')
const models = require('./models')
const DB_HOST = process.env.DB_HOST
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const PORT = process.env.PORT || 4000

db.connect(DB_HOST)

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      throw new Error('Session invalid')
    }
  }
}

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization
      const user = getUser(token)
      console.log(user)
      return { models, user }
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
