import React from 'react';
import './StoriesList.css';

const StoriesList = ({ stories, onStorySelect, currentUserIndex }) => {
  return (
    <div className="stories-list">
      <div className="stories-scroll">
        {stories.map((user, index) => (
          <div 
            key={user.id}
            className={`story-item ${user.isActive ? 'active' : ''}`}
            onClick={() => onStorySelect(index)}
          >
            <div className="story-avatar">
              <img 
                src={user.profileImage} 
                alt={user.username}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiMzMzMiLz4KPHBhdGggZD0iTTMwIDM1QzM1LjUyMjggMzUgNDAgMzAuNTIyOCA0MCAyNUM0MCAxOS40NzcyIDM1LjUyMjggMTUgMzAgMTVDMjQuNDc3MiAxNSAyMCAxOS40NzcyIDIwIDI1QzIwIDMwLjUyMjggMjQuNDc3MiAzNSAzMCAzNVoiIGZpbGw9IiM2NjYiLz4KPGNpcmNsZSBjeD0iMzAiIGN5PSIyNSIgcj0iNSIgZmlsbD0iIzk5OSIvPgo8L3N2Zz4K';
                }}
              />
              {user.isActive && <div className="active-status"></div>}
            </div>
            <span className="story-username">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesList;