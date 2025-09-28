import React, { useState, useEffect } from 'react';
import StoriesList from './components/StoriesList/StoriesList';
import StoryViewer from './components/StoryViewer/StoryViewer';
import { useStories } from './hooks/useStories';
import { storiesData } from './data/storiesData';
import './App.css';

function App() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const {
    currentUserIndex,
    currentStoryIndex,
    currentUser,
    currentStory,
    progress,
    isPlaying,
    nextStory,
    previousStory,
    goToStory,
    pause,
    play
  } = useStories(storiesData);

  
  useEffect(() => {
    if (isViewerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isViewerOpen]);

  const handleStorySelect = (userIndex) => {
    goToStory(userIndex);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    pause();
  };

  const handleNext = () => {
    nextStory();
    if (!currentUser) {
      handleCloseViewer();
    }
  };

  const handlePrevious = () => {
    previousStory();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Instagram Stories</h1>
      </header>

      <main className="app-main">
        <StoriesList 
          stories={storiesData}
          onStorySelect={handleStorySelect}
          currentUserIndex={currentUserIndex}
        />
        
        <div className="content-placeholder">
          <div className="placeholder-icon">📱</div>
          <h2>Instagram Stories Clone</h2>
          <p>Tap on a story above to view it</p>
          <p>Stories automatically advance every 5 seconds</p>
          <div className="features">
            <span>← Tap left for previous</span>
            <span>Tap right for next →</span>
          </div>
        </div>
      </main>

      {isViewerOpen && (
        <StoryViewer
          user={currentUser}
          currentStoryIndex={currentStoryIndex}
          progress={progress}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClose={handleCloseViewer}
          isPlaying={isPlaying}
        />
      )}
    </div>
  );
}

export default App;