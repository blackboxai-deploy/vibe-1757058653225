'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { baseAnimePrompt } from '@/lib/animePrompts';

interface SystemPromptEditorProps {
  systemPrompt?: string;
  onPromptChange: (prompt: string) => void;
}

export function SystemPromptEditor({ systemPrompt, onPromptChange }: SystemPromptEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(systemPrompt || baseAnimePrompt);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handlePromptChange = (value: string) => {
    setCurrentPrompt(value);
    setHasUnsavedChanges(value !== systemPrompt);
  };

  const saveChanges = () => {
    onPromptChange(currentPrompt);
    setHasUnsavedChanges(false);
  };

  const resetToDefault = () => {
    setCurrentPrompt(baseAnimePrompt);
    setHasUnsavedChanges(baseAnimePrompt !== systemPrompt);
  };

  const discardChanges = () => {
    setCurrentPrompt(systemPrompt || baseAnimePrompt);
    setHasUnsavedChanges(false);
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-gray-600">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-black/20 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Advanced: System Prompt Editor
                {hasUnsavedChanges && (
                  <Badge variant="outline" className="border-orange-500 text-orange-300 bg-orange-900/20">
                    Unsaved Changes
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-black/30 text-gray-300">
                  {isOpen ? 'Collapse' : 'Expand'}
                </Badge>
                <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  ⬇️
                </span>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-3">
              <h4 className="text-blue-300 font-medium mb-2">ℹ️ About System Prompts</h4>
              <p className="text-blue-200 text-sm leading-relaxed">
                The system prompt defines how the AI interprets your character descriptions. 
                You can customize this to achieve specific art styles, character types, or visual themes. 
                Changes apply to all future generations until reset.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Custom System Prompt
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetToDefault}
                    className="border-gray-600 text-gray-300 hover:bg-black/20"
                  >
                    Reset to Default
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={currentPrompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                className="min-h-[200px] bg-black/20 border-gray-600 text-white placeholder:text-gray-400 
                  font-mono text-sm leading-relaxed resize-none"
                placeholder="Enter your custom system prompt..."
              />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {currentPrompt.length} characters
                </span>
                <Badge 
                  variant={currentPrompt.length > 1000 ? "destructive" : "secondary"}
                  className="bg-black/30 text-gray-300"
                >
                  {currentPrompt.length > 1000 ? 'Very Long' : 'Good Length'}
                </Badge>
              </div>
            </div>

            {/* Preset Prompt Examples */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Quick Presets</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePromptChange(
                    "Create a high-quality anime character in Demon Slayer style with intense battle poses, dramatic lighting, and detailed breathing technique effects."
                  )}
                  className="border-gray-600 text-gray-300 hover:bg-black/20 text-left justify-start h-auto py-2 px-3"
                >
                  <div>
                    <div className="font-medium">Battle Focus</div>
                    <div className="text-xs text-gray-400">Dynamic poses, intense effects</div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePromptChange(
                    "Generate peaceful Demon Slayer characters with soft expressions, traditional Japanese settings, and gentle color palettes."
                  )}
                  className="border-gray-600 text-gray-300 hover:bg-black/20 text-left justify-start h-auto py-2 px-3"
                >
                  <div>
                    <div className="font-medium">Peaceful Style</div>
                    <div className="text-xs text-gray-400">Calm expressions, soft colors</div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePromptChange(
                    "Create traditional Japanese artwork featuring Demon Slayer characters with ink wash painting style, minimalist backgrounds, and cultural authenticity."
                  )}
                  className="border-gray-600 text-gray-300 hover:bg-black/20 text-left justify-start h-auto py-2 px-3"
                >
                  <div>
                    <div className="font-medium">Traditional Art</div>
                    <div className="text-xs text-gray-400">Ink wash, cultural themes</div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePromptChange(baseAnimePrompt)}
                  className="border-gray-600 text-gray-300 hover:bg-black/20 text-left justify-start h-auto py-2 px-3"
                >
                  <div>
                    <div className="font-medium">Default Kimetsu</div>
                    <div className="text-xs text-gray-400">Standard Demon Slayer style</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            {hasUnsavedChanges && (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={saveChanges}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                >
                  💾 Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={discardChanges}
                  className="border-gray-600 text-gray-300 hover:bg-black/20"
                >
                  Discard
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}