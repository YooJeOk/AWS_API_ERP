import { useCallback } from 'react';

const useTTS = (baseUrl = 'http://localhost:8080/api/tts') => {
  const playTTS = useCallback(async (message) => {
    try {
      const response = await fetch(`${baseUrl}?text=${encodeURIComponent(message)}`);
      if (!response.ok) {
        throw new Error('TTS API request failed');
      }
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Failed to play TTS message:", error);
    }
  }, [baseUrl]);

  return playTTS;
};

export default useTTS;
