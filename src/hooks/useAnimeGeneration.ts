'use client';

import { useState, useCallback } from 'react';

export interface GenerationParams {
  prompt: string;
  breathingStyle?: string;
  characterType?: string;
  artStyle?: string;
  scene?: string;
  customSystemPrompt?: string;
}

export interface GeneratedImage {
  id: string;
  imageUrl: string;
  prompt: string;
  breathingStyle?: string;
  characterType?: string;
  artStyle?: string;
  scene?: string;
  timestamp: string;
}

export const useAnimeGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);

  const generateImage = useCallback(async (params: GenerationParams): Promise<GeneratedImage | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      const generatedImage: GeneratedImage = {
        id: Date.now().toString(),
        imageUrl: data.imageUrl,
        prompt: params.prompt,
        breathingStyle: params.breathingStyle,
        characterType: params.characterType,
        artStyle: params.artStyle,
        scene: params.scene,
        timestamp: new Date().toISOString(),
      };

      setCurrentImage(generatedImage);
      return generatedImage;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Generation error:', err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    generateImage,
    isGenerating,
    error,
    currentImage,
    clearError,
  };
};