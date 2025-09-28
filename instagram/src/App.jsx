import React, { useState, useEffect } from "react";
import StoriesList from "./components/StoriesList/StoriesList";
import StoryViewer from "./components/StoryViewer/StoryViewer";
import { useStories } from "./hooks/useStories";
import { storiesData } from "./data/storiesData";
import "./App.css";

function App() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isViewerOpen]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <header className="app-header">
        <h1>Instagram Stories</h1>
        <button
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
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
