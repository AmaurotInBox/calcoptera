import React from 'react'
// import ReactMarkdown from 'react-markdown'
import { useQuery, gql } from '@apollo/client'

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`

export default Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES)

  if (loading) return <p>loading...</p>

  if (error) return <p>Error!</p>

  return (
    <div>
      {data.noteFeed.notes.map((note) => (
        <article key={note.id}>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />{' '}
          {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
          {/* <ReactMarkdown source={note.content} /> */}
        </article>
      ))}
    </div>
  )
}
