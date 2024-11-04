import { useCallback, useMemo, useEffect } from 'react';

const useClickSound = (soundUrl = '/images/mouth-bass.mp3') => {
  const clickSound = useMemo(() => new Audio(soundUrl), [soundUrl]);

  useEffect(() => {
    const loadSound = async () => {
      try {
        await clickSound.play(); 
        clickSound.pause(); 
        clickSound.currentTime = 0; 
      } catch (error) {
        console.error("Failed to load sound:", error);
      }
    };

    loadSound();
  }, [clickSound]);

  const ClickSound = useCallback(() => {
    clickSound.currentTime = 0; 
    clickSound.play().catch(error => {
      console.error("Failed to play click sound:", error);
    });
  }, [clickSound]);

  return ClickSound;
};

export default useClickSound;
