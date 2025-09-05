'use client';

import { breathingStyles, BreathingStyle } from '@/lib/breathingStyles';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BreathingStyleSelectorProps {
  selectedStyle?: string;
  onStyleSelect: (styleId: string) => void;
}

export function BreathingStyleSelector({ selectedStyle, onStyleSelect }: BreathingStyleSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-3">
        Choose Your Breathing Style
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {breathingStyles.map((style: BreathingStyle) => (
          <Card
            key={style.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
              selectedStyle === style.id
                ? 'border-white ring-2 ring-white/50'
                : 'border-gray-600 hover:border-gray-400'
            }`}
            onClick={() => onStyleSelect(style.id)}
          >
            <CardContent className="p-4">
              <div className={`w-full h-24 rounded-lg mb-3 ${style.colors.gradient} 
                flex items-center justify-center relative overflow-hidden`}>
                
                {/* Visual effects overlay */}
                <div className="absolute inset-0 opacity-30">
                  {style.id === 'water' && (
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      animate-pulse" />
                  )}
                  {style.id === 'flame' && (
                    <div className="w-full h-full">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60 animate-bounce"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${20 + (i % 2) * 40}%`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {style.id === 'thunder' && (
                    <div className="w-full h-full relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        w-8 h-0.5 bg-white rotate-12 animate-pulse" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        w-6 h-0.5 bg-white -rotate-12 animate-pulse" style={{ animationDelay: '0.1s' }} />
                    </div>
                  )}
                  {style.id === 'insect' && (
                    <div className="w-full h-full relative">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-pink-300 rounded-full animate-ping"
                          style={{
                            left: `${25 + i * 15}%`,
                            top: `${30 + (i % 3) * 20}%`,
                            animationDelay: `${i * 0.3}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {style.id === 'stone' && (
                    <div className="w-full h-full bg-gradient-to-b from-transparent via-black/10 to-transparent" />
                  )}
                </div>
                
                <div className="relative z-10 text-center">
                  <h4 className="text-white font-bold text-sm mb-1">
                    {style.name}
                  </h4>
                  <Badge variant="secondary" className="text-xs bg-black/30 text-white border-0">
                    {style.visualEffects[0]}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-gray-300 text-center leading-tight">
                {style.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedStyle && (
        <div className="mt-4 p-4 rounded-lg bg-black/20 border border-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-purple-600 text-white">Selected Style</Badge>
            <span className="text-white font-medium">
              {breathingStyles.find(s => s.id === selectedStyle)?.name}
            </span>
          </div>
          <p className="text-sm text-gray-300">
            {breathingStyles.find(s => s.id === selectedStyle)?.description}
          </p>
        </div>
      )}
    </div>
  );
}