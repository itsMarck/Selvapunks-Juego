import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

const INITIAL_STATE: GameState = {
  spkBalance: 0,
  experience: 0,
  level: 1
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('gameState');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const addSPK = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      spkBalance: prev.spkBalance + amount
    }));
  };

  const addExperience = (amount: number) => {
    setGameState(prev => {
      const newExp = prev.experience + amount;
      const newLevel = Math.floor(newExp / 100) + 1;
      
      return {
        ...prev,
        experience: newExp,
        level: newLevel
      };
    });
  };

  return { gameState, addSPK, addExperience };
}