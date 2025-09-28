import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ stories, currentIndex, progress }) => {
  return (
    <div className="progress-bars">
      {stories.map((_, index) => (
        <div key={index} className="progress-bar-container">
          <div 
            className={`progress-bar ${index < currentIndex ? 'completed' : ''}`}
          >
            {index === currentIndex && (
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;