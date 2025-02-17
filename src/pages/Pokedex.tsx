import { useState } from "react";
import PokeCard from "../components/Pokemon/PokeCard";
import SearchBar from "../components/UI/SearchBar";
import { useQueryClient } from "@tanstack/react-query";
import PokeDetails from "../components/Pokemon/PokeDetails/PokeDetails";
import Spinner from "../components/UI/Spinner";
import { PokedexProps, PokemonType } from "../types";

const Pokedex = (props: PokedexProps) => {
  const { isLoading } = props;

  const [search, setSearch] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState<PokemonType>();

  const queryClient = useQueryClient();
  const pokemon = queryClient.getQueryData<PokemonType[]>(["allPokemon"]);

  return (
    <div className="bg-[#f7f8fc] pl-40 py-12 h-screen w-screen flex flex-row space-y-4">
      <div className="w-[70%] flex-shrink-0">
        <img
          src={"pokeball.png"}
          alt={"name"}
          className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 opacity-40 rotate-18 w-120 h-120 object-contain group-hover:scale-110 transition-transform duration-150"
        />
        <SearchBar onChange={setSearch} />
        {isLoading ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-wrap flex-row justify-between gap-y-16 pt-16 h-full overflow-y-auto pr-4">
            {pokemon &&
              pokemon
                .filter((element) => element.name.startsWith(search))
                .map((pokemon, index) => {
                  return (
                    <PokeCard
                      onClick={() => setCurrentPokemon(pokemon)}
                      key={index}
                      pokemon={pokemon}
                    />
                  );
                })}
          </div>
        )}
      </div>
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        {currentPokemon && <PokeDetails pokemon={currentPokemon} />}
      </div>
    </div>
  );
};

export default Pokedex;
