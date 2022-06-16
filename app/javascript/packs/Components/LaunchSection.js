import React from 'react';

export const LaunchSection = ({data}) => {
  const {upvotes, commentsCount, viewsCount, dailyRank, weeklyRank} = data;
  return (
    <div className="launch">
      <div className="header">About this launch</div>
      <div className="data">
        <div>
          <div className="title">
            Upvotes
          </div>
          <div className="text">
            {upvotes}
          </div>
        </div>
        <div className="vertical-line"/>
        
        <div>
          <div className="title">
            Comments
          </div>
          <div className="text">
            {commentsCount}
          </div>
        </div>
        <div className="vertical-line"/>
        
        <div>
          <div className="title">
            Views
          </div>
          <div className="text">
            {viewsCount}
          </div>
        </div>
        <div className="vertical-line"/>
        
        <div>
          <div className="title">
            Daily rank
          </div>
          <div className="text">
            #{dailyRank}
          </div>
        </div>
        <div className="vertical-line"/>
        
        <div>
          <div className="title">
            Weekly rank
          </div>
          <div className="text">
            #{weeklyRank}
          </div>
        </div>
      </div>
      <div className="vertical-line"/>
      
      <div className="bottom">
        <span>Report</span>
        <span>.</span>
        <span>Edit this page</span>
      </div>
    </div>
  )
}