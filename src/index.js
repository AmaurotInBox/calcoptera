const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const PORT = process.env.PORT || 4000

const notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' },
]

const typeDefs = gql`
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id)
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      const noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott',
      }
      notes.push(noteValue)
      return noteValue
    },
  },
}

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers })
  const app = express()
  await server.start()
  server.applyMiddleware({ app, path: '/api' })

  app.listen(PORT, () => {
    console.log(
      `Server is listening on port http://127.0.0.1:${PORT}${server.graphqlPath}`
    )
  })
}

startApolloServer(typeDefs, resolvers)
