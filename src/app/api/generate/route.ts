import { NextRequest, NextResponse } from 'next/server';
import { generatePrompt } from '@/lib/animePrompts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      prompt, 
      breathingStyle, 
      characterType, 
      artStyle, 
      scene,
      customSystemPrompt 
    } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Generate enhanced prompt with Kimetsu no Yaiba styling
    const enhancedPrompt = customSystemPrompt 
      ? `${customSystemPrompt} ${prompt}`
      : generatePrompt(prompt, breathingStyle, characterType, artStyle, scene);

    // Call the custom AI endpoint for image generation
    const response = await fetch('https://oi-server.onrender.com/chat/completions', {
      method: 'POST',
      headers: {
        'customerId': 'kupet5741@gmail.com',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxx'
      },
      body: JSON.stringify({
        model: 'replicate/black-forest-labs/flux-1.1-pro',
        messages: [
          {
            role: 'user',
            content: enhancedPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to generate image', details: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Extract image URL from the response
    let imageUrl = null;
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      imageUrl = data.choices[0].message.content;
    } else if (data.output) {
      imageUrl = data.output;
    } else if (typeof data === 'string') {
      imageUrl = data;
    }

    if (!imageUrl) {
      console.error('No image URL in response:', data);
      return NextResponse.json(
        { error: 'No image URL received from API' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      metadata: {
        prompt: enhancedPrompt,
        breathingStyle,
        characterType,
        artStyle,
        scene,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}