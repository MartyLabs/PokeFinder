import { useQuery } from "@tanstack/react-query";
import "./App.css";
import Pokedex from "./pages/Pokedex";
import { fetchAllPokemon } from "./services/api";
import { PokemonType } from "./types";

function App() {
  const { isLoading } = useQuery<PokemonType[]>({
    queryKey: ["allPokemon"],
    queryFn: () => fetchAllPokemon(100),
    staleTime: Infinity,
  });

  return <Pokedex isLoading={isLoading} />;
}

export default App;
