import * as React from 'react';
import renderComponent from './utils/renderComponent';
import {useQuery, useMutation} from "react-apollo";
import {CommentSection} from "./Components/CommentSection";
import {LaunchSection} from "./Components/LaunchSection";
import HunterImage from '../assets/hunter.svg'
import CommenterImage from '../assets/commenter.svg'
import MakerImage from '../assets/maker.svg'
import UpvoterImage from '../assets/upvoter.svg'
import {useState} from "react";
import {TrendingLaunches} from "./Components/TrendingLaunches";
import {FETCH_USER, UPDATE_VOTE, REMOVE_VOTE, fetchPost} from './Queries';

const list = (data, tipImage) => {
  return (
    <div className="image-container">
      <img src={data.image} className="avatar" alt="Avatar"/>
      <img src={tipImage} className="tip-image" alt="Image Marker"/>
    </div>
  )
}

function PostsShow({postId}) {
  const {data, loading, error} = useQuery(fetchPost(postId));
  const userQuery = useQuery(FETCH_USER);
  const [updateVote] = useMutation(UPDATE_VOTE, {refetchQueries: [{query: fetchPost(postId)}]});
  const [removeVote] = useMutation(REMOVE_VOTE, {refetchQueries: [{query: fetchPost(postId)}]});
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  const post = data?.post;
  const isLoggedInUser = userQuery.data.viewer?.id
  
  const handleUpvoteOnClick = () => {
    if (isLoggedInUser && post.canBeVoted) {
      if (post.isVoted) {
        removeVote({variables: {postId: post.id}})
      } else {
        updateVote({variables: {postId: post.id}});
      }
    } else {
      window.location.href = window.location.origin + '/users/sign_in';
    }
  }
  
  const handleCommentOnClick = () => {
    if (!isLoggedInUser) {
      window.location.href = window.location.origin + '/users/sign_in';
    }
  }
  
  
  return (
    <div className="box">
      <article className="post">
        <div className="hero-section">
          <div>
            <img src={post.image} className="hero-image" alt={"Hero Image"}/>
            <h2>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </h2>
            <div className="tagline">{post.tagline}</div>
          </div>
          <div className="button-section">
            <div className="url">
              <a href={post.url} target="_blank">Visit</a>
            </div>
            
            <div className="upvote-button">
              <button className={post.isVoted ? "voted" : "not-voted"}
                      onClick={handleUpvoteOnClick}>{post.isVoted ? 'Upvoted' : 'Upvote'} {post?.votesCount}</button>
              <img src={UpvoterImage} alt="Upvote Image"/>
            </div>
          
          </div>
        </div>
        <p>{post.description}</p>
        
        <div className="flex">
          {list(post.user, HunterImage)}
          {post.makers.length > 0 && post.makers.map((item) => list(item, MakerImage))}
          {post.commenters.length > 0 && post.commenters.map((item) => list(item, CommenterImage))}
          {post.voters.length > 0 && post.voters.map((item) => list(item, UpvoterImage))}
        </div>
        
        <div className="horizontal-line"/>
        <section className="comments-header">
          <div className="image-section">
            <img src={post?.user?.image ? post.user.image : 'https://via.placeholder.com/200x200'} alt="User Image"/>
            <span>What do you think?</span>
          </div>
          <button onClick={handleCommentOnClick}>{isLoggedInUser ? 'Comment' : 'Login to Comment'}</button>
        </section>
        <div className="horizontal-line"/>
        
        {post.comments.length > 0 && post.comments.map((item, key) => {
          return (
            <CommentSection data={item} id={key}/>
          )
        })}
        
        <LaunchSection data={{
          commentsCount: post.commentsCount,
          dailyRank: post.dailyFeedPosition,
          viewsCount: post.viewsCount,
          upvotes: post.votesCount,
          weeklyRank: post.weeklyFeedPosition
        }}/>
        
        <TrendingLaunches postId={post.id}/>
      </article>
    </div>
  );
}

renderComponent(PostsShow);
