import React from 'react';
import gql from "graphql-tag";
import {useQuery} from "react-apollo";

const FETCH_ALL_POSTS = gql`
    query PostsAll {
        postsAll {
            id
            title
            tagline
            url
            commentsCount
        }
    }
`

const showTrendingLaunches = (data, postId) => {
  data = data.filter((item) => item.id !== postId)
  if (data.length > 3) {
    data = data.splice(3, data.length - 3)
  }
  
  return data.map((item, key) => {
    return (
      <div key={key}>
        {key !== 0 &&
        <div className="vertical-line"/>
        }
        <div>
          <img src="https://via.placeholder.com/200x200" alt="Trending launch"/>
          <div className="title">{item.title}</div>
          <div className="tagline">{item.tagline}</div>
          <div className="comments-count">{item.commentsCount} Comments</div>
        </div>
      </div>
    )
  })
}

export const TrendingLaunches = ({postId}) => {
  const {data, loading, error} = useQuery(FETCH_ALL_POSTS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  return (
    <>
      {data?.postsAll &&
      <div className="trending">
        <div className="head-section">
          <div className="horizontal-line"/>
          <span>Trending Launches</span>
          <div className="horizontal-line"/>
        </div>
        <div className="container">
          {showTrendingLaunches(data.postsAll, postId)}
        </div>
      </div>
      }
    </>
  )
}