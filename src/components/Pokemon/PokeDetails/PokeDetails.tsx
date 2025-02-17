import { PokemonType } from "../../../types";
import { capitalize, typeColors } from "../../../utils/utils";
import Abilities from "./Abilities";
import Description from "./Description";
import Evolution from "./Evolution";
import Metrics from "./Metrics";
import Stats from "./Stats";

const PokeDetails = ({ pokemon }: { pokemon: PokemonType }) => {
  const { name, sprites, id, types } = pokemon;

  return (
    <div className="w-90 mt-12 h-auto rounded-3xl px-6 bg-white shadow-md flex flex-col items-center justify-center relative pb-5">
      <img
        src={sprites.front_default}
        alt={name}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-54 h-54"
      />

      {/* Contenu sous l'image */}
      <div className="flex flex-col items-center space-y-2.5 mt-24">
        <span className="font-semibold text-gray-400">N°{id}</span>
        <h2 className="font-bold text-2xl">{capitalize(name)}</h2>

        {/* Type(s) du Pokémon */}
        <div className="flex justify-center space-x-2">
          {types.map((type) => (
            <span
              key={type.type.name}
              style={{
                backgroundColor:
                  typeColors[type.type.name.toLowerCase()] || "#777",
              }}
              className="text-white rounded-lg px-2 py-0.5"
            >
              {capitalize(type.type.name)}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        <Description pokemon={pokemon} />
        <Metrics pokemon={pokemon} />
        <Abilities pokemon={pokemon} />
        <Stats pokemon={pokemon} />
        <Evolution pokemon={pokemon} />
      </div>
    </div>
  );
};

export default PokeDetails;
