import React, { useState, useEffect } from 'react';
import { Character } from '../utils/characterGenerator';

interface Props {
  character: Character;
  onOpponentSelected: (opponent: Character) => void;
}

export function ArenaSelection({ character, onOpponentSelected }: Props) {
  const [opponents, setOpponents] = useState<Character[]>([]);

  useEffect(() => {
    // Generate 6 random opponents of similar level
    const generateOpponents = () => {
      const names = ['Warrior', 'Gladiator', 'Champion', 'Fighter', 'Berserker', 'Hunter'];
      return names.map(name => ({
        name,
        level: character.level,
        stats: {
          health: 65,
          strength: 1 + Math.floor(Math.random() * 30),
          agility: 1 + Math.floor(Math.random() * 30),
          speed: 1 + Math.floor(Math.random() * 30)
        }
      }));
    };

    setOpponents(generateOpponents());
  }, [character]);

  return (
    <div className="min-h-screen bg-[#f7e5c2] p-8">
      <div className="max-w-4xl mx-auto bg-[#ffe9c4] rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-brown-800">ARENA</h2>
          <p>You have 6 fights left today!</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Character Stats */}
          <div className="p-4 bg-[#fff5e0] rounded-lg">
            <h3 className="font-bold">{character.name}</h3>
            <div className="space-y-2 mt-2">
              <div>Health: {character.stats.health}</div>
              <div>Strength: {character.stats.strength}</div>
              <div>Agility: {character.stats.agility}</div>
              <div>Speed: {character.stats.speed}</div>
            </div>
          </div>

          {/* Opponents Grid */}
          <div className="grid grid-cols-2 gap-2">
            {opponents.map((opponent, index) => (
              <button
                key={index}
                onClick={() => onOpponentSelected(opponent)}
                className="p-2 bg-[#fff5e0] rounded hover:bg-[#ffe9c4] transition"
              >
                <div className="font-bold">{opponent.name}</div>
                <div>Level {opponent.level}</div>
                <div>HP: {opponent.stats.health}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}