import { useEffect, useState } from "react";
import { PokemonType } from "../../../types";

const Abilities = ({ pokemon }: { pokemon: PokemonType }) => {
  const [abilities, setAbilities] = useState<string[]>([]);

  useEffect(() => {
    const arr = pokemon.abilities.reduce<string[]>((acc, current) => {
      acc.push(current.ability.name);
      return acc;
    }, []);

    setAbilities(arr);
  }, [pokemon.abilities]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <span className="font-bold">Abilities</span>
        <div className="flex flex-row justify-center w-full space-x-2">
          {abilities?.map((ability, index) => {
            return (
              <div
                key={index}
                className="bg-gray-200 flex flex-col items-center w-1/2 rounded-full py-2"
              >
                <span>
                  {ability
                    .split("-")
                    .map(
                      (word) => word.slice(0, 1).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Abilities;
