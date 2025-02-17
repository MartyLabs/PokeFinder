import { PokeCardProps, PokemonTypeDetail } from "../../types";
import { capitalize, typeColors } from "../../utils/utils";

const PokeCard = ({ pokemon, onClick }: PokeCardProps) => {
  const { name, sprites, id, types } = pokemon;

  return (
    <div
      onClick={onClick}
      className="w-70 h-40 rounded-3xl cursor-pointer hover:border-2 hover:border-gray-300 hover:shadow-none transition-all duration-50 bg-white shadow-md flex flex-col items-center justify-center relative group"
    >
      {/* Image centrée en X et Y sur l'arrête du haut */}
      <img
        src={sprites.front_default}
        alt={name}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-150"
      />

      {/* Contenu sous l'image */}
      <div className="flex flex-col items-center space-y-2.5 mt-8">
        <span className="font-semibold text-gray-400">N°{id}</span>
        <h2 className="font-bold text-2xl">{capitalize(name)}</h2>

        {/* Type(s) du Pokémon */}
        <div className="flex justify-center space-x-2">
          {types.map((type: PokemonTypeDetail) => (
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
    </div>
  );
};

export default PokeCard;
