import React from 'react'
import { useQuery, gql } from '@apollo/client'

import NoteFeed from '../components/NoteFeed'
import Button from '../components/Button'

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
    <>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes,
                    ],
                    __typename: 'noteFeed',
                  },
                }
              },
            })
          }}
        >
          Load more
        </Button>
      )}
    </>
  )
}
