'use client';

import { useEffect, useCallback } from 'react';
import { breathingStyles } from '@/lib/breathingStyles';

export const useBreathingEffects = () => {
  // Create visual effect particles based on breathing style
  const createBreathingEffect = useCallback((styleId: string, containerElement?: HTMLElement) => {
    const style = breathingStyles.find(s => s.id === styleId);
    if (!style || !containerElement) return;

    const effects = style.visualEffects;

    effects.forEach((effect, index) => {
      setTimeout(() => {
        createEffectParticle(effect, containerElement);
      }, index * 200);
    });
  }, []);

  const createEffectParticle = (effect: string, container: HTMLElement) => {
    const particle = document.createElement('div');
    particle.className = 'absolute pointer-events-none z-10 transition-all duration-1000';
    
    // Style based on effect type
    switch (effect) {
      case 'water-ripple':
        particle.className += ' w-4 h-4 border-2 border-blue-400 rounded-full opacity-60';
        particle.style.animation = 'ripple 2s ease-out infinite';
        break;
        
      case 'flowing-streams':
        particle.className += ' w-8 h-1 bg-blue-300 opacity-40 rounded-full';
        particle.style.animation = 'flow 3s linear infinite';
        break;
        
      case 'flame-particles':
        particle.className += ' w-2 h-2 bg-orange-400 rounded-full opacity-80';
        particle.style.animation = 'flicker 1.5s ease-in-out infinite';
        break;
        
      case 'ember-glow':
        particle.className += ' w-3 h-3 bg-yellow-300 rounded-full opacity-60';
        particle.style.animation = 'glow 2s ease-in-out infinite';
        break;
        
      case 'lightning-bolts':
        particle.className += ' w-6 h-0.5 bg-yellow-200 opacity-90';
        particle.style.animation = 'flash 0.8s ease-out infinite';
        break;
        
      case 'electric-sparks':
        particle.className += ' w-1 h-1 bg-white rounded-full opacity-100';
        particle.style.animation = 'spark 1.2s ease-out infinite';
        break;
        
      case 'butterfly-swirl':
        particle.className += ' w-3 h-3 bg-purple-300 rounded-full opacity-70';
        particle.style.animation = 'swirl 3s ease-in-out infinite';
        break;
        
      case 'petal-dance':
        particle.className += ' w-2 h-4 bg-pink-300 opacity-60';
        particle.style.animation = 'dance 4s linear infinite';
        break;
        
      case 'rock-fragments':
        particle.className += ' w-2 h-2 bg-gray-400 opacity-80';
        particle.style.animation = 'tumble 2.5s ease-out infinite';
        break;
        
      default:
        particle.className += ' w-2 h-2 bg-white rounded-full opacity-50';
        particle.style.animation = 'fade 2s ease-out infinite';
    }

    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (container.contains(particle)) {
        container.removeChild(particle);
      }
    }, 4000);
  };

  // Initialize CSS animations
  useEffect(() => {
    if (!document.getElementById('breathing-effects-styles')) {
      const style = document.createElement('style');
      style.id = 'breathing-effects-styles';
      style.textContent = `
        @keyframes ripple {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes flow {
          0% { transform: translateX(-100px) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100px) rotate(10deg); opacity: 0; }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.6; filter: blur(0px); }
          50% { opacity: 0.9; filter: blur(2px); }
        }
        
        @keyframes flash {
          0% { opacity: 0; transform: scaleX(0); }
          10% { opacity: 1; transform: scaleX(1); }
          90% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }
        
        @keyframes spark {
          0% { opacity: 1; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
          100% { opacity: 0; transform: scale(0.5) rotate(360deg); }
        }
        
        @keyframes swirl {
          0% { transform: rotate(0deg) translateX(10px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
        }
        
        @keyframes dance {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { transform: translateY(-50px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes tumble {
          0% { transform: rotate(0deg) translateY(0); opacity: 1; }
          100% { transform: rotate(180deg) translateY(30px); opacity: 0; }
        }
        
        @keyframes fade {
          0% { opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Apply breathing style theme to an element
  const applyBreathingTheme = useCallback((element: HTMLElement, styleId: string) => {
    const style = breathingStyles.find(s => s.id === styleId);
    if (!style) return;

    // Add gradient classes
    element.classList.add('bg-gradient-to-br');
    element.style.background = `linear-gradient(to bottom right, ${style.colors.primary})`;
  }, []);

  // Get breathing style colors
  const getBreathingColors = useCallback((styleId: string) => {
    const style = breathingStyles.find(s => s.id === styleId);
    return style ? style.colors : null;
  }, []);

  return {
    createBreathingEffect,
    applyBreathingTheme,
    getBreathingColors,
  };
};