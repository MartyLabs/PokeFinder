import { useEffect, useState } from "react";
import { fetchEvolutionChain } from "../../../services/api";
import { EvolutionChainType, PokemonType } from "../../../types";

const Evolution = ({ pokemon }: { pokemon: PokemonType }) => {
  const [evolution, setEvolution] = useState<EvolutionChainType[]>();

  useEffect(() => {
    const fetchPokemonFromEvolution = async () => {
      try {
        const [evolutionChain] = await Promise.all([
          fetchEvolutionChain(pokemon.id),
        ]);

        if (evolutionChain) {
          setEvolution(evolutionChain);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      }
    };

    fetchPokemonFromEvolution();
  }, [pokemon]);

  return (
    <div className="flex flex-row w-full justify-center items-center">
      {evolution?.map((element, index) => {
        return (
          <>
            <img
              src={element.pokemon.sprites.front_default}
              key={index}
              alt={element.pokemon.name}
              className="w-18 h-18"
            />
            {index + 1 < evolution.length ? (
              <div className="bg-gray-100 flex flex-row justify-center items-center w-full rounded-full py-1">
                <span className="text-xs font-bold">
                  {element.min_level ? "Lv." + element.min_level : "?"}
                </span>
              </div>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Evolution;
