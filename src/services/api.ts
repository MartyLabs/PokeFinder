import axios from "axios";
import { EvolutionChain, PokemonSpeciesType, PokemonType } from "../types";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const API_URL_SPE = "https://pokeapi.co/api/v2/pokemon-species/";

export const getPokemon = async (name: string) => {
  try {
    const { data } = await axios.get(`${API_URL}${name}`);
    return data;
  } catch (error) {
    console.error("Error during Pokemon fetching", error);
  }

  return null;
};

export const fetchPokemonBatch = async (pageParams: number) => {
  try {
    let batch: PokemonType[] = [];
    const urlToFetch =
      API_URL + "?limit=30&offset=${" + (pageParams - 1) * 10 + "}";

    //Get pokemon list from url
    const { data } = await axios.get(urlToFetch);
    const results = data.results;

    const pokemonDetailsPromises = results.map(
      async (pokemon: { name: string }) => {
        const response = await getPokemon(pokemon.name);
        return response;
      }
    );

    batch = await Promise.all(pokemonDetailsPromises);

    return batch;
  } catch (error) {
    console.log("Fcn => fetchPokemonBatch | Error => ", error);
    return [];
  }
};

export const fetchAllPokemon = async (limit: number) => {
  try {
    let allPokemons: PokemonType[] = [];
    let nextUrl = API_URL + "?limit=" + limit;

    while (nextUrl) {
      //Get pokemon list from url
      const { data } = await axios.get(nextUrl);
      const results = data.results;

      // Fetch details for each pokemon and store them in an array
      const pokemonDetailsPromises = results.map(
        async (pokemon: { name: string }) => {
          const response = await getPokemon(pokemon.name);
          return response;
        }
      );

      // Wait for all promises to resolve
      const pokemonDetails = await Promise.all(pokemonDetailsPromises);

      allPokemons = [...allPokemons, ...pokemonDetails];
      nextUrl = data.next;
    }

    return allPokemons;
  } catch (error) {
    console.error("Error during Pokemon fetching", error);
    return [];
  }
};

export const fetchSpecies = async (pokemonId: number) => {
  try {
    const { data } = await axios.get(`${API_URL_SPE}${pokemonId}`);
    return data;
  } catch (error) {
    console.error("Error during Pokemon evolution fetching", error);
  }

  return null;
};

export const fetchEvolution = async (pokemonId: number) => {
  try {
    const species: PokemonSpeciesType = await fetchSpecies(pokemonId);
    const { data } = await axios.get(species.evolution_chain.url);
    return data;
  } catch (error) {
    console.error("Error during Pokemon evolution fetching", error);
  }

  return null;
};

export const fetchEvolutionChain = async (pokemonId: number) => {
  try {
    const data = await fetchEvolution(pokemonId);

    // Extract the entire evolution chain
    const evolutionChain = [];
    let current = data.chain;

    while (current) {
      const pokemonData = await getPokemon(current.species.name);

      evolutionChain.push({
        name: current.species.name,
        pokemon: pokemonData,
        min_level: current.evolves_to[0]?.evolution_details[0]?.min_level,
        url: current.species.url.replace("pokemon-species", "pokemon"),
        evolves_to: current.evolves_to.map(
          (evo: EvolutionChain) => evo.species.name
        ),
      });

      current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
    }

    return evolutionChain;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la chaîne d'évolution :",
      error
    );
    return null;
  }
};
