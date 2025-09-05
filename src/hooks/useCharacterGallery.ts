'use client';

import { useState, useEffect, useCallback } from 'react';
import { GeneratedImage } from './useAnimeGeneration';

const STORAGE_KEY = 'kimetsu-character-gallery';

export const useCharacterGallery = () => {
  const [gallery, setGallery] = useState<GeneratedImage[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load gallery from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const storedFavorites = localStorage.getItem(`${STORAGE_KEY}-favorites`);
        
        if (stored) {
          setGallery(JSON.parse(stored));
        }
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load gallery from localStorage:', error);
      }
    }
  }, []);

  // Save gallery to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && gallery.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery));
      } catch (error) {
        console.error('Failed to save gallery to localStorage:', error);
      }
    }
  }, [gallery]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && favorites.length > 0) {
      try {
        localStorage.setItem(`${STORAGE_KEY}-favorites`, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage:', error);
      }
    }
  }, [favorites]);

  const addToGallery = useCallback((image: GeneratedImage) => {
    setGallery(prev => [image, ...prev.slice(0, 49)]); // Keep only last 50 images
  }, []);

  const removeFromGallery = useCallback((id: string) => {
    setGallery(prev => prev.filter(img => img.id !== id));
    setFavorites(prev => prev.filter(favId => favId !== id));
  }, []);

  const clearGallery = useCallback(() => {
    setGallery([]);
    setFavorites([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}-favorites`);
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(id);
      if (isFavorite) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const getImagesByBreathingStyle = useCallback((breathingStyle: string) => {
    return gallery.filter(img => img.breathingStyle === breathingStyle);
  }, [gallery]);

  const getImagesByCharacterType = useCallback((characterType: string) => {
    return gallery.filter(img => img.characterType === characterType);
  }, [gallery]);

  const getFavoriteImages = useCallback(() => {
    return gallery.filter(img => favorites.includes(img.id));
  }, [gallery, favorites]);

  const exportGallery = useCallback(() => {
    const dataStr = JSON.stringify({
      gallery,
      favorites,
      exportedAt: new Date().toISOString()
    }, null, 2);
    
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `kimetsu-gallery-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [gallery, favorites]);

  return {
    gallery,
    favorites,
    addToGallery,
    removeFromGallery,
    clearGallery,
    toggleFavorite,
    getImagesByBreathingStyle,
    getImagesByCharacterType,
    getFavoriteImages,
    exportGallery,
  };
};