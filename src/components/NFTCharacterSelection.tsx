import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { useSelvaPunks } from '../hooks/useSelvaPunks';
import type { Character } from '../utils/characterGenerator';

interface Props {
  onCharacterSelected: (character: Character) => void;
}

export function NFTCharacterSelection({ onCharacterSelected }: Props) {
  const { account, provider } = useWallet();
  const { ownedNFTs, loading } = useSelvaPunks(provider, account);

  const handleSelectNFT = (nftId: number) => {
    const character: Character = {
      name: `SelvaPunk #${nftId}`,
      level: 1,
      stats: {
        health: 65,
        strength: 10 + (nftId % 20), // Deterministic stats based on NFT ID
        agility: 5 + (nftId % 25),
        speed: 8 + (nftId % 22)
      }
    };
    onCharacterSelected(character);
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-[#f7e5c2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p>Please connect your wallet to access your SelvaPunks NFTs</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7e5c2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading NFTs...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7e5c2] p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Your Character</h2>
        <div className="grid grid-cols-3 gap-6">
          {ownedNFTs.map((nft) => (
            <div
              key={nft.id}
              className="bg-white rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition"
              onClick={() => handleSelectNFT(nft.id)}
            >
              <img
                src={nft.imageUrl}
                alt={`SelvaPunk #${nft.id}`}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold text-center">SelvaPunk #{nft.id}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}