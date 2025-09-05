export const baseAnimePrompt = `
Create a high-quality anime character illustration in the style of Kimetsu no Yaiba (Demon Slayer). 
The artwork should feature:
- Detailed character design with expressive eyes and facial features
- Dynamic pose and composition
- Rich color palette with proper shading and highlights
- Clean linework typical of professional anime production
- Atmospheric background that complements the character
- High attention to clothing details and accessories
`;

export const characterPrompts = {
  'tanjiro-inspired': `
    Young male demon slayer with dark red hair, kind eyes, checkered green and black haori jacket,
    earrings, scar on forehead, carrying a katana, determined but compassionate expression,
    ${baseAnimePrompt}
  `,
  'nezuko-inspired': `
    Young female character with long black hair, pink ribbon, bamboo muzzle, 
    pink kimono with geometric patterns, gentle but fierce expression,
    ${baseAnimePrompt}
  `,
  'hashira-water': `
    Calm male demon slayer with dark blue hair, water breathing technique effects,
    blue and white haori, stoic expression, surrounded by flowing water effects,
    ${baseAnimePrompt}
  `,
  'hashira-flame': `
    Energetic male demon slayer with flame-colored hair, flame breathing technique effects,
    red and white haori with flame patterns, passionate expression, fire effects,
    ${baseAnimePrompt}
  `,
  'demon-character': `
    Supernatural demon character with unique features, glowing eyes, sharp teeth,
    elaborate clothing, intimidating but beautiful design, supernatural aura,
    ${baseAnimePrompt}
  `
};

export const scenePrompts = {
  'training-ground': 'Traditional Japanese training ground with wooden practice dummies, cherry blossom trees',
  'bamboo-forest': 'Dense bamboo forest with dappled sunlight, peaceful atmosphere',
  'mountain-temple': 'Ancient temple on a mountain peak, traditional architecture',
  'village-street': 'Taisho era Japanese village street with traditional houses',
  'battlefield': 'Dramatic battle scene with dramatic lighting and effects',
  'peaceful-garden': 'Traditional Japanese garden with koi pond and stone lanterns'
};

export const breathingEffectPrompts = {
  water: 'flowing water effects, water droplets, ripple patterns, mist, blue energy aura',
  flame: 'flame effects, ember particles, heat shimmer, fire trails, orange-red energy aura',
  thunder: 'lightning effects, electric sparks, speed lines, yellow energy aura, dynamic motion',
  insect: 'butterfly effects, flower petals, graceful movement, purple energy aura, delicate patterns',
  stone: 'rock fragments, earth effects, solid stance, brown-gray energy aura, sturdy appearance'
};

export const generatePrompt = (
  basePrompt: string,
  breathingStyle?: string,
  characterType?: string,
  artStyle?: string,
  scene?: string
): string => {
  let fullPrompt = basePrompt;

  if (breathingStyle && breathingEffectPrompts[breathingStyle as keyof typeof breathingEffectPrompts]) {
    fullPrompt += ` ${breathingEffectPrompts[breathingStyle as keyof typeof breathingEffectPrompts]},`;
  }

  if (characterType) {
    fullPrompt += ` ${characterType} character design,`;
  }

  if (artStyle) {
    fullPrompt += ` ${artStyle} art style,`;
  }

  if (scene && scenePrompts[scene as keyof typeof scenePrompts]) {
    fullPrompt += ` ${scenePrompts[scene as keyof typeof scenePrompts]},`;
  }

  fullPrompt += ` masterpiece, best quality, highly detailed, professional anime artwork`;

  return fullPrompt;
};