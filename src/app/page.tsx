'use client';

import { useState, useEffect } from 'react';
import { ImageGenerator } from '@/components/ImageGenerator';
import { ImageDisplay } from '@/components/ImageDisplay';
import { CharacterGallery } from '@/components/CharacterGallery';
import { SystemPromptEditor } from '@/components/SystemPromptEditor';
import { useCharacterGallery } from '@/hooks/useCharacterGallery';
import { GeneratedImage } from '@/hooks/useAnimeGeneration';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<string>('');
  const [showGallery, setShowGallery] = useState(false);
  
  const {
    gallery,
    favorites,
    addToGallery,
    removeFromGallery,
    clearGallery,
    toggleFavorite,
    exportGallery,
  } = useCharacterGallery();

  const handleImageGenerated = (image: GeneratedImage) => {
    setCurrentImage(image);
    addToGallery(image);
  };

  const handleImageSelected = (image: GeneratedImage) => {
    setCurrentImage(image);
    setShowGallery(false);
  };

  // Particle animation effect
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'fixed w-1 h-1 bg-white opacity-30 rounded-full pointer-events-none z-0';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = '-10px';
      particle.style.animation = `fall ${3 + Math.random() * 4}s linear infinite`;
      document.body.appendChild(particle);

      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, 7000);
    };

    const interval = setInterval(createParticle, 300);
    
    // Add CSS for falling animation
    if (!document.getElementById('particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        @keyframes fall {
          to { transform: translateY(100vh); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-2">
                  鬼滅の刃 AI Studio
                </h1>
                <p className="text-gray-400 text-lg">
                  Forge legendary characters with the power of breathing techniques
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-3 py-1">
                  ⚡ Powered by FLUX
                </Badge>
                
                <Button
                  variant={showGallery ? "default" : "outline"}
                  onClick={() => setShowGallery(!showGallery)}
                  className={showGallery 
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white" 
                    : "border-gray-600 text-gray-300 hover:bg-black/20"
                  }
                >
                  📚 Gallery ({gallery.length})
                </Button>

                {gallery.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={exportGallery}
                    className="border-gray-600 text-gray-300 hover:bg-black/20"
                  >
                    📤 Export
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {showGallery ? (
            /* Gallery View */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Character Gallery</h2>
                <Button
                  onClick={() => setShowGallery(false)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                >
                  ← Back to Studio
                </Button>
              </div>
              
              <CharacterGallery
                images={gallery}
                favorites={favorites}
                onImageSelect={handleImageSelected}
                onFavoriteToggle={toggleFavorite}
                onRemoveImage={removeFromGallery}
                onClearGallery={clearGallery}
              />
            </div>
          ) : (
            /* Main Studio View */
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Generation Controls */}
              <div className="xl:col-span-2 space-y-6">
                {/* Welcome Card */}
                {!currentImage && gallery.length === 0 && (
                  <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm border-purple-500/30">
                    <CardContent className="p-8 text-center">
                      <div className="space-y-4">
                        <div className="text-6xl mb-4">⚔️</div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          Welcome to the Demon Slayer AI Studio
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                          Harness the power of ancient breathing techniques to forge legendary characters. 
                          Choose your breathing style, describe your vision, and watch as the AI brings 
                          your Demon Slayer characters to life with stunning detail and authenticity.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                          <Badge className="bg-blue-600 text-white">💧 Water Breathing</Badge>
                          <Badge className="bg-red-600 text-white">🔥 Flame Breathing</Badge>
                          <Badge className="bg-yellow-600 text-white">⚡ Thunder Breathing</Badge>
                          <Badge className="bg-purple-600 text-white">🦋 Insect Breathing</Badge>
                          <Badge className="bg-gray-600 text-white">🪨 Stone Breathing</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Image Generator */}
                <ImageGenerator onImageGenerated={handleImageGenerated} />

                {/* System Prompt Editor */}
                <SystemPromptEditor
                  systemPrompt={systemPrompt}
                  onPromptChange={setSystemPrompt}
                />
              </div>

              {/* Right Column - Image Display */}
              <div className="space-y-6">
                <ImageDisplay
                  image={currentImage}
                  onFavoriteToggle={currentImage ? toggleFavorite : undefined}
                  isFavorite={currentImage ? favorites.includes(currentImage.id) : false}
                />

                {/* Recent Characters Preview */}
                {gallery.length > 0 && (
                  <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Recent Characters</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowGallery(true)}
                          className="border-gray-600 text-gray-300 hover:bg-black/20"
                        >
                          View All
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {gallery.slice(0, 6).map((image) => (
                          <div
                            key={image.id}
                            className="aspect-square rounded-lg overflow-hidden cursor-pointer 
                              border-2 border-gray-600 hover:border-gray-400 transition-colors"
                            onClick={() => setCurrentImage(image)}
                          >
                            <img
                              src={image.imageUrl}
                              alt={image.prompt}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/20 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center space-y-2">
              <p className="text-gray-400">
                Created with the spirit of Demon Slayer • Powered by AI breathing techniques
              </p>
              <p className="text-sm text-gray-500">
                "The bond between those who share the same wind is more resilient than blood."
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}