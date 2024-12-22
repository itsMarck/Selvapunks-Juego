import React, { useState } from 'react';
import { Character } from './types/game';
import { NFTCharacterSelection } from './components/NFTCharacterSelection';
import { ArenaSelection } from './components/ArenaSelection';
import { BattleScene } from './components/BattleScene';
import { SPKDisplay } from './components/SPKDisplay';
import { useGameState } from './hooks/useGameState';

function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [opponent, setOpponent] = useState<Character | null>(null);
  const { gameState, addSPK, addExperience } = useGameState();

  const handleBattleComplete = (won: boolean) => {
    if (won) {
      addSPK(5); // Award 5 SPK for victory
      addExperience(20); // Award 20 XP for victory
    }
    setOpponent(null);
  };

  return (
    <div className="relative">
      <SPKDisplay balance={gameState.spkBalance} />
      
      {!character && (
        <NFTCharacterSelection 
          onCharacterSelected={setCharacter}
          gameState={gameState}
        />
      )}
      
      {character && !opponent && (
        <ArenaSelection
          character={character}
          onOpponentSelected={setOpponent}
          gameState={gameState}
        />
      )}
      
      {character && opponent && (
        <BattleScene
          character={character}
          opponent={opponent}
          onBattleComplete={handleBattleComplete}
        />
      )}
    </div>
  );
}

export default App;