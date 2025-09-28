import { useState, useEffect, useCallback } from 'react';

export const useStories = (storiesData) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentUser = storiesData[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];

  const nextStory = useCallback(() => {
    if (!currentUser) return;

    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else if (currentUserIndex < storiesData.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
    } else {
      setIsPlaying(false);
    }
  }, [currentStoryIndex, currentUserIndex, storiesData.length, currentUser]);

  const previousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1);
      const previousUserStories = storiesData[currentUserIndex - 1].stories;
      setCurrentStoryIndex(previousUserStories.length - 1);
      setProgress(0);
    }
  }, [currentStoryIndex, currentUserIndex, storiesData]);

  const goToStory = (userIndex, storyIndex = 0) => {
    if (userIndex >= 0 && userIndex < storiesData.length) {
      setCurrentUserIndex(userIndex);
      setCurrentStoryIndex(storyIndex);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!isPlaying || !currentStory) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextStory();
          return 0;
        }
        return prev + 1;
      });
    }, currentStory.duration / 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentStory, nextStory]);

  const pause = () => setIsPlaying(false);
  const play = () => setIsPlaying(true);

  return {
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
  };
};