export interface BreathingStyle {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  description: string;
  promptModifier: string;
  visualEffects: string[];
}

export const breathingStyles: BreathingStyle[] = [
  {
    id: 'water',
    name: 'Water Breathing',
    colors: {
      primary: 'from-blue-900 to-cyan-800',
      secondary: 'from-teal-700 to-blue-600',
      accent: 'text-cyan-300',
      gradient: 'bg-gradient-to-br from-blue-900 via-teal-800 to-cyan-700'
    },
    description: 'Calm and flowing like water, adaptable to any situation',
    promptModifier: 'water breathing technique, flowing water effects, calm and serene atmosphere, blue and teal color scheme',
    visualEffects: ['water-ripple', 'flowing-streams', 'mist']
  },
  {
    id: 'flame',
    name: 'Flame Breathing',
    colors: {
      primary: 'from-red-900 to-orange-700',
      secondary: 'from-yellow-600 to-red-700',
      accent: 'text-orange-300',
      gradient: 'bg-gradient-to-br from-red-900 via-orange-800 to-yellow-600'
    },
    description: 'Passionate and powerful like roaring flames',
    promptModifier: 'flame breathing technique, fire effects, passionate and energetic atmosphere, red orange yellow color scheme',
    visualEffects: ['flame-particles', 'ember-glow', 'heat-shimmer']
  },
  {
    id: 'thunder',
    name: 'Thunder Breathing',
    colors: {
      primary: 'from-yellow-500 to-amber-400',
      secondary: 'from-yellow-300 to-orange-400',
      accent: 'text-yellow-200',
      gradient: 'bg-gradient-to-br from-yellow-500 via-amber-400 to-orange-500'
    },
    description: 'Swift and precise like lightning strikes',
    promptModifier: 'thunder breathing technique, lightning effects, swift and precise atmosphere, yellow and electric color scheme',
    visualEffects: ['lightning-bolts', 'electric-sparks', 'thunder-flash']
  },
  {
    id: 'insect',
    name: 'Insect Breathing',
    colors: {
      primary: 'from-purple-800 to-violet-600',
      secondary: 'from-lavender-500 to-purple-700',
      accent: 'text-purple-300',
      gradient: 'bg-gradient-to-br from-purple-800 via-violet-700 to-pink-600'
    },
    description: 'Delicate yet deadly like a butterfly\'s dance',
    promptModifier: 'insect breathing technique, butterfly effects, elegant and graceful atmosphere, purple and lavender color scheme',
    visualEffects: ['butterfly-swirl', 'petal-dance', 'poison-mist']
  },
  {
    id: 'stone',
    name: 'Stone Breathing',
    colors: {
      primary: 'from-gray-800 to-stone-700',
      secondary: 'from-slate-600 to-gray-800',
      accent: 'text-stone-300',
      gradient: 'bg-gradient-to-br from-gray-800 via-stone-700 to-slate-600'
    },
    description: 'Solid and unwavering like mountain stone',
    promptModifier: 'stone breathing technique, rock and earth effects, strong and solid atmosphere, gray and earth tone color scheme',
    visualEffects: ['rock-fragments', 'earth-tremor', 'stone-barrier']
  }
];

export const characterTypes = [
  {
    id: 'demon-slayer',
    name: 'Demon Slayer',
    description: 'Brave warriors who hunt demons',
    promptModifier: 'demon slayer character, katana sword, haori jacket, determined expression'
  },
  {
    id: 'hashira',
    name: 'Hashira',
    description: 'Elite demon slayer pillars',
    promptModifier: 'hashira pillar character, master level demon slayer, unique haori design, confident pose'
  },
  {
    id: 'demon',
    name: 'Demon',
    description: 'Supernatural beings with unique abilities',
    promptModifier: 'demon character, supernatural features, glowing eyes, intimidating presence'
  },
  {
    id: 'civilian',
    name: 'Civilian',
    description: 'Ordinary people in the Taisho era',
    promptModifier: 'Taisho era civilian, traditional Japanese clothing, peaceful expression'
  }
];

export const artStyles = [
  {
    id: 'anime',
    name: 'Anime Style',
    description: 'Modern anime artwork',
    promptModifier: 'anime art style, cel shading, vibrant colors, clean lines'
  },
  {
    id: 'manga',
    name: 'Manga Style',
    description: 'Black and white manga artwork',
    promptModifier: 'manga art style, black and white, detailed linework, screentone effects'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Traditional watercolor painting',
    promptModifier: 'watercolor painting style, soft gradients, flowing colors, traditional art'
  },
  {
    id: 'ink',
    name: 'Traditional Ink',
    description: 'Japanese ink painting style',
    promptModifier: 'traditional Japanese ink painting, sumi-e style, minimalist, brush strokes'
  }
];