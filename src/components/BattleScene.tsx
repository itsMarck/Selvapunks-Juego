import React, { useState, useEffect } from 'react';
import { Character } from '../types/game';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  character: Character;
  opponent: Character;
  onBattleComplete: (won: boolean) => void;
}

export function BattleScene({ character, opponent, onBattleComplete }: Props) {
  const [playerHealth, setPlayerHealth] = useState(character.stats.health);
  const [opponentHealth, setOpponentHealth] = useState(opponent.stats.health);
  const [currentTurn, setCurrentTurn] = useState<'player' | 'opponent'>('player');
  const [isAttacking, setIsAttacking] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const handleAttack = async () => {
    if (currentTurn !== 'player' || isAttacking) return;

    setIsAttacking(true);
    const damage = Math.floor(character.stats.strength * (1 + character.stats.agility / 100));
    
    // Attack animation
    await new Promise(resolve => setTimeout(resolve, 500));
    setOpponentHealth(prev => Math.max(0, prev - damage));
    setBattleLog(prev => [...prev, `${character.name} deals ${damage} damage!`]);
    
    setIsAttacking(false);
    setCurrentTurn('opponent');
  };

  useEffect(() => {
    if (currentTurn === 'opponent' && opponentHealth > 0) {
      const performOpponentAttack = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const damage = Math.floor(opponent.stats.strength * (1 + opponent.stats.agility / 100));
        setPlayerHealth(prev => Math.max(0, prev - damage));
        setBattleLog(prev => [...prev, `${opponent.name} deals ${damage} damage!`]);
        setCurrentTurn('player');
      };
      performOpponentAttack();
    }
  }, [currentTurn, opponent]);

  useEffect(() => {
    if (playerHealth <= 0 || opponentHealth <= 0) {
      setTimeout(() => {
        onBattleComplete(opponentHealth <= 0);
      }, 1500);
    }
  }, [playerHealth, opponentHealth]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 relative">
      <div className="absolute inset-0 bg-[url('/arena-bg.png')] bg-cover bg-center opacity-50" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Health Bars */}
        <div className="flex justify-between mb-8">
          <div className="w-64">
            <div className="text-lg font-bold mb-2">{character.name}</div>
            <div className="h-4 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${(playerHealth / character.stats.health) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="w-64">
            <div className="text-lg font-bold mb-2 text-right">{opponent.name}</div>
            <div className="h-4 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${(opponentHealth / opponent.stats.health) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Battle Area */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            animate={{
              x: isAttacking && currentTurn === 'player' ? 100 : 0,
              scale: isAttacking && currentTurn === 'player' ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={character.imageUrl} 
              alt={character.name}
              className="w-48 h-48 object-contain"
            />
          </motion.div>

          <motion.div
            animate={{
              x: isAttacking && currentTurn === 'opponent' ? -100 : 0,
              scale: isAttacking && currentTurn === 'opponent' ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={opponent.imageUrl} 
              alt={opponent.name}
              className="w-48 h-48 object-contain"
            />
          </motion.div>
        </div>

        {/* Battle Log */}
        <div className="bg-white bg-opacity-80 rounded-lg p-4 mb-4 h-32 overflow-y-auto">
          <AnimatePresence>
            {battleLog.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-1"
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="text-center">
          <button
            onClick={handleAttack}
            disabled={currentTurn !== 'player' || isAttacking}
            className="px-8 py-3 bg-red-500 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-red-600 transition"
          >
            Attack!
          </button>
        </div>
      </div>
    </div>
  );
}