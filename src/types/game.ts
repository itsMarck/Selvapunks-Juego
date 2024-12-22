export interface GameState {
  spkBalance: number;
  experience: number;
  level: number;
}

export interface Character {
  id: number;
  name: string;
  level: number;
  experience: number;
  stats: {
    health: number;
    strength: number;
    agility: number;
    defense: number;
  };
  imageUrl: string;
}