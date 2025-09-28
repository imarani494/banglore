import React, { useState, useEffect } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './StoryViewer.css';

const StoryViewer = ({ 
  user, 
  currentStoryIndex, 
  progress, 
  onNext, 
  onPrevious, 
  onClose,
  isPlaying 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const currentStory = user?.stories[currentStoryIndex];

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [currentStory]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width / 3) {
      onPrevious();
    } else if (x > (width * 2) / 3) {
      onNext();
    }
  };

  if (!user || !currentStory) {
    return (
      <div className="story-viewer">
        <div className="story-error">Story not available</div>
      </div>
    );
  }

  return (
    <div className="story-viewer">
      <div className="story-header">
        <ProgressBar 
          stories={user.stories}
          currentIndex={currentStoryIndex}
          progress={progress}
        />
        
        <div className="story-user-info">
          <div className="user-avatar">
            <img 
              src={user.profileImage} 
              alt={user.username}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzMzMiLz4KPHBhdGggZD0iTTIwIDI1QzI1LjUyMjggMjUgMzAgMjAuNTIyOCAzMCAxNUMzMCA5LjQ3NzE1IDI1LjUyMjggNSAyMCA1QzE0LjQ3NzIgNSAxMCA5LjQ3NzE1IDEwIDE1QzEwIDIwLjUyMjggMTQuNDc3MiAyNSAyMCAyNVoiIGZpbGw9IiM2NjYiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNSIgcj0iNSIgZmlsbD0iIzk5OSIvPgo8L3N2Zz4K';
              }}
            />
          </div>
          <span className="username">{user.username}</span>
          <span className="timestamp">{currentStory.timestamp}</span>
        </div>
      </div>

      <div className="story-content" onClick={handleClick}>
        {!imageLoaded && !imageError && (
          <div className="story-loading">
            <div className="loading-spinner"></div>
            <p>Loading story...</p>
          </div>
        )}
        
        {imageError ? (
          <div className="story-error-image">
            <div className="error-icon">📷</div>
            <p>Failed to load image</p>
          </div>
        ) : (
          <img
            src={currentStory.imageUrl}
            alt={`Story by ${user.username}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`story-image ${imageLoaded ? 'loaded' : 'loading'}`}
          />
        )}
      </div>

      <button className="close-btn" onClick={onClose}>
        ✕
      </button>

      <div className="navigation-overlay">
        <div className="nav-area prev-area" onClick={onPrevious} />
        <div className="nav-area next-area" onClick={onNext} />
      </div>
    </div>
  );
};


export default StoryViewer;