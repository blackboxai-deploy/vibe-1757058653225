'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BreathingStyleSelector } from './BreathingStyleSelector';
import { characterTypes, artStyles } from '@/lib/breathingStyles';
import { useAnimeGeneration, GenerationParams } from '@/hooks/useAnimeGeneration';

interface ImageGeneratorProps {
  onImageGenerated?: (image: any) => void;
}

export function ImageGenerator({ onImageGenerated }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedBreathingStyle, setSelectedBreathingStyle] = useState<string>('');
  const [selectedCharacterType, setSelectedCharacterType] = useState<string>('');
  const [selectedArtStyle, setSelectedArtStyle] = useState<string>('anime');
  const [progress, setProgress] = useState(0);

  const { generateImage, isGenerating, error, clearError } = useAnimeGeneration();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    clearError();
    setProgress(0);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 1000);

    const params: GenerationParams = {
      prompt: prompt.trim(),
      breathingStyle: selectedBreathingStyle || undefined,
      characterType: selectedCharacterType || undefined,
      artStyle: selectedArtStyle || undefined,
    };

    const result = await generateImage(params);
    
    clearInterval(progressInterval);
    setProgress(100);
    
    setTimeout(() => setProgress(0), 1000);

    if (result && onImageGenerated) {
      onImageGenerated(result);
    }
  };

  return (
    <div className="space-y-6">
      {/* Prompt Input Section */}
      <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            Describe Your Character
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="A brave demon slayer with kind eyes and determination..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-black/20 border-gray-600 text-white placeholder:text-gray-400 resize-none"
            maxLength={500}
          />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              {prompt.length}/500 characters
            </span>
            <Badge 
              variant={prompt.length > 400 ? "destructive" : "secondary"}
              className="bg-black/30 text-gray-300"
            >
              {prompt.length > 400 ? 'Nearly at limit' : 'Good length'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Breathing Style Selection */}
      <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
        <CardContent className="p-6">
          <BreathingStyleSelector
            selectedStyle={selectedBreathingStyle}
            onStyleSelect={setSelectedBreathingStyle}
          />
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
        <CardHeader>
          <CardTitle className="text-white text-lg">Character & Style Options</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Character Type</label>
            <Select value={selectedCharacterType} onValueChange={setSelectedCharacterType}>
              <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                <SelectValue placeholder="Choose character type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-600">
                <SelectItem value="">Any Character Type</SelectItem>
                {characterTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id} className="text-gray-200">
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs text-gray-400">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Art Style</label>
            <Select value={selectedArtStyle} onValueChange={setSelectedArtStyle}>
              <SelectTrigger className="bg-black/20 border-gray-600 text-white">
                <SelectValue placeholder="Choose art style" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-600">
                {artStyles.map((style) => (
                  <SelectItem key={style.id} value={style.id} className="text-gray-200">
                    <div>
                      <div className="font-medium">{style.name}</div>
                      <div className="text-xs text-gray-400">{style.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Forging your character...</span>
                <span className="text-purple-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-black/30" />
              <p className="text-sm text-gray-400 text-center">
                The breathing technique is being applied to your creation
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="bg-red-900/20 backdrop-blur-sm border-red-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-red-300 font-medium">Generation Failed</span>
            </div>
            <p className="text-red-200 text-sm mt-2">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearError}
              className="mt-3 border-red-600 text-red-300 hover:bg-red-900/30"
            >
              Dismiss
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <div className="text-center">
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          size="lg"
          className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 
            text-white font-bold py-4 px-8 rounded-lg transform transition-all duration-200 hover:scale-105 
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-purple-500/25"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Breathing Life Into Art...
            </div>
          ) : (
            <>🗡️ Forge Character</>
          )}
        </Button>
      </div>
    </div>
  );
}