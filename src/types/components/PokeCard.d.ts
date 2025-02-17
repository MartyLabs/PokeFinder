export interface PokeCardProps {
  pokemon: PokemonType;
  onClick: () => void;
}

export type PokemonTypeDetail = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
