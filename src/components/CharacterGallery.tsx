'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GeneratedImage } from '@/hooks/useAnimeGeneration';
import { breathingStyles } from '@/lib/breathingStyles';

interface CharacterGalleryProps {
  images: GeneratedImage[];
  favorites: string[];
  onImageSelect: (image: GeneratedImage) => void;
  onFavoriteToggle: (id: string) => void;
  onRemoveImage: (id: string) => void;
  onClearGallery: () => void;
}

export function CharacterGallery({ 
  images, 
  favorites, 
  onImageSelect, 
  onFavoriteToggle, 
  onRemoveImage,
  onClearGallery 
}: CharacterGalleryProps) {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const getFilteredImages = () => {
    let filteredImages = [...images];

    // Apply filters
    if (filter === 'favorites') {
      filteredImages = filteredImages.filter(img => favorites.includes(img.id));
    } else if (filter !== 'all') {
      filteredImages = filteredImages.filter(img => img.breathingStyle === filter);
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filteredImages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (sortBy === 'oldest') {
      filteredImages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }

    return filteredImages;
  };

  const filteredImages = getFilteredImages();

  if (images.length === 0) {
    return (
      <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
        <CardContent className="p-8 text-center">
          <div className="space-y-3">
            <div className="text-4xl">📚</div>
            <h3 className="text-lg font-semibold text-white">
              Your Gallery Awaits
            </h3>
            <p className="text-gray-400 text-sm">
              Generated characters will appear here for you to revisit
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            Character Gallery
            <Badge variant="secondary" className="bg-black/30 text-gray-300">
              {images.length}
            </Badge>
          </CardTitle>
          
          {images.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearGallery}
              className="border-red-600 text-red-300 hover:bg-red-900/20"
            >
              Clear All
            </Button>
          )}
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="bg-black/20 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-600">
              <SelectItem value="all" className="text-gray-200">All Characters</SelectItem>
              <SelectItem value="favorites" className="text-gray-200">❤️ Favorites</SelectItem>
              {breathingStyles.map((style) => (
                <SelectItem key={style.id} value={style.id} className="text-gray-200">
                  {style.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-black/20 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-600">
              <SelectItem value="newest" className="text-gray-200">Newest First</SelectItem>
              <SelectItem value="oldest" className="text-gray-200">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredImages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No characters match your current filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
            {filteredImages.map((image) => {
              const breathingStyle = breathingStyles.find(style => style.id === image.breathingStyle);
              const isFavorite = favorites.includes(image.id);
              
              return (
                <div
                  key={image.id}
                  className="relative group cursor-pointer"
                  onClick={() => onImageSelect(image)}
                >
                  <div className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    breathingStyle 
                      ? `border-transparent bg-gradient-to-br ${breathingStyle.colors.gradient} p-0.5 group-hover:scale-105` 
                      : 'border-gray-600 group-hover:border-gray-400'
                  }`}>
                    <div className="bg-black rounded-lg overflow-hidden">
                      <img
                        src={image.imageUrl}
                        alt={image.prompt}
                        className="w-full aspect-square object-cover transition-opacity group-hover:opacity-80"
                      />
                      
                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onFavoriteToggle(image.id);
                            }}
                            className={`p-1 h-8 w-8 ${isFavorite ? 'text-red-400' : 'text-gray-300'} hover:text-red-300`}
                          >
                            {isFavorite ? '❤️' : '🤍'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveImage(image.id);
                            }}
                            className="p-1 h-8 w-8 text-gray-300 hover:text-red-300"
                          >
                            🗑️
                          </Button>
                        </div>
                      </div>
                      
                      {/* Style indicator */}
                      {breathingStyle && (
                        <div className="absolute top-1 left-1">
                          <Badge 
                            className={`${breathingStyle.colors.gradient} text-white border-0 text-xs px-1 py-0`}
                          >
                            {breathingStyle.name.split(' ')[0]}
                          </Badge>
                        </div>
                      )}
                      
                      {/* Favorite indicator */}
                      {isFavorite && (
                        <div className="absolute top-1 right-1">
                          <Badge className="bg-red-600 text-white border-0 text-xs px-1 py-0">
                            ❤️
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Character info */}
                  <div className="mt-2 px-1">
                    <p className="text-xs text-gray-400 truncate" title={image.prompt}>
                      {image.prompt}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(image.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Gallery Stats */}
        {images.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-600">
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>Total: {images.length}</span>
              <span>Favorites: {favorites.length}</span>
              <span>Displayed: {filteredImages.length}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}