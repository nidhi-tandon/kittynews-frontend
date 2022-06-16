import * as React from 'react';
import {useQuery} from 'react-apollo';
import renderComponent from './utils/renderComponent';
import {FETCH_ALL} from './Queries'

function PostsIndex() {
  const {data, loading, error} = useQuery(FETCH_ALL);
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  return (
    <div className="box">
      {data?.postsAll && data?.postsAll.map((post) => (
        <article className="post" key={post.id}>
          <h2>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </h2>
          <div className="url">
            <a href={post.url}>{post.url}</a>
          </div>
          <div className="tagline">{post.tagline}</div>
          <footer>
            <button>🔼 0</button>
            <button>💬 {post.commentsCount}</button>
          </footer>
        </article>
      ))}
    </div>
  );
}

renderComponent(PostsIndex);
