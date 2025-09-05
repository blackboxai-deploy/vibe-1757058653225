'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GeneratedImage } from '@/hooks/useAnimeGeneration';
import { breathingStyles } from '@/lib/breathingStyles';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  onFavoriteToggle?: (id: string) => void;
  isFavorite?: boolean;
}

export function ImageDisplay({ image, onFavoriteToggle, isFavorite }: ImageDisplayProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!image) {
    return (
      <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-purple-800 
              flex items-center justify-center text-4xl">
              🎨
            </div>
            <h3 className="text-xl font-semibold text-white">
              Ready to Create
            </h3>
            <p className="text-gray-400">
              Choose your breathing style and describe your character to begin
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const breathingStyle = breathingStyles.find(style => style.id === image.breathingStyle);

  const downloadImage = async () => {
    if (!image.imageUrl) return;

    setIsDownloading(true);
    try {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `kimetsu-character-${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card className={`bg-black/40 backdrop-blur-sm border-2 transition-all duration-300 ${
      breathingStyle 
        ? `border-gradient bg-gradient-to-br ${breathingStyle.colors.gradient}` 
        : 'border-gray-600'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Generated Character
          </CardTitle>
          <div className="flex items-center gap-2">
            {breathingStyle && (
              <Badge 
                className={`${breathingStyle.colors.gradient} text-white border-0`}
              >
                {breathingStyle.name}
              </Badge>
            )}
            {onFavoriteToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFavoriteToggle(image.id)}
                className={`p-2 ${isFavorite ? 'text-red-400' : 'text-gray-400'} hover:text-red-300`}
              >
                {isFavorite ? '❤️' : '🤍'}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Image Display */}
        <div className="relative">
          <div className={`relative rounded-lg overflow-hidden ${
            breathingStyle ? 'ring-2 ring-white/20' : ''
          }`}>
            {!imageLoaded && !imageError && (
              <div className="aspect-square bg-black/30 flex items-center justify-center">
                <div className="space-y-2 text-center">
                  <div className="w-8 h-8 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-400">Loading masterpiece...</p>
                </div>
              </div>
            )}
            
            {imageError ? (
              <div className="aspect-square bg-red-900/20 border-2 border-red-600 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-2xl">⚠️</div>
                  <p className="text-red-300 text-sm">Failed to load image</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setImageError(false);
                      setImageLoaded(false);
                    }}
                    className="border-red-600 text-red-300"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            ) : (
              <img
                src={image.imageUrl}
                alt={image.prompt}
                className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
            
            {/* Breathing Style Overlay Effect */}
            {breathingStyle && imageLoaded && (
              <div className={`absolute inset-0 ${breathingStyle.colors.gradient} opacity-10 rounded-lg`}></div>
            )}
          </div>
        </div>

        {/* Image Metadata */}
        <div className="space-y-3">
          <div className="bg-black/20 rounded-lg p-3 border border-gray-600">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Prompt</h4>
            <p className="text-sm text-white leading-relaxed">
              {image.prompt}
            </p>
          </div>

          {/* Character Details */}
          <div className="flex flex-wrap gap-2">
            {image.characterType && (
              <Badge variant="outline" className="border-gray-600 text-gray-300 bg-black/20">
                {image.characterType.charAt(0).toUpperCase() + image.characterType.slice(1).replace('-', ' ')}
              </Badge>
            )}
            {image.artStyle && (
              <Badge variant="outline" className="border-gray-600 text-gray-300 bg-black/20">
                {image.artStyle.charAt(0).toUpperCase() + image.artStyle.slice(1)} Style
              </Badge>
            )}
            <Badge variant="outline" className="border-gray-600 text-gray-300 bg-black/20">
              {new Date(image.timestamp).toLocaleDateString()}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={downloadImage}
            disabled={isDownloading || !imageLoaded}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isDownloading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Downloading...
              </div>
            ) : (
              <>📥 Download</>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.open(image.imageUrl, '_blank')}
            disabled={!imageLoaded}
            className="border-gray-600 text-gray-300 hover:bg-black/20"
          >
            🔍 View Full
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}