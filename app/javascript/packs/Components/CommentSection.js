import React from "react";

export const CommentSection = ({data, id}) => {
  return (
    <div className="comments" key={id}>
      <div className="image-section">
        <img src={data.user.image}/>
        <span className="name">{data.user.name}</span>
        <span className="username">@{data.user.username}</span>
      </div>
      <div className="description-section">
        <div className="description">{data.text}</div>
        <button>Upvote</button>
        <button>Reply</button>
        <button>Share</button>
        <span className="timestamp">{data.createdAt}</span>
      </div>
    </div>
  )
}