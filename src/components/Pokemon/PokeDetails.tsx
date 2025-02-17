import { useEffect, useState } from "react";
import {
  EvolutionChainType,
  PokemonSpeciesType,
  PokemonType,
  StatsBadgeType,
} from "../../types";
import { capitalize, getTrigram, typeColors } from "../../utils/utils";
import { fetchEvolutionChain, fetchSpecies } from "../../services/api";

const StatsBadge = ({ name, value, color }: StatsBadgeType) => {
  return (
    <div
      style={{
        backgroundColor: name === "TOT" ? "#8ba9e9" : "#f3f4f6",
      }}
      className="flex flex-col items-center rounded-full bg-gray-100 p-1"
    >
      <div
        style={{
          backgroundColor: color || "#777",
        }}
        className="bg-red-400 rounded-full w-[25px] h-[25px] aspect-square flex justify-center items-center"
      >
        <span className="text-[10px] font-bold text-white">{name}</span>
      </div>
      <span className="text-sm font-bold py-1 text-center">{value}</span>
    </div>
  );
};

const Stats = ({ pokemon }: { pokemon: PokemonType }) => {
  const stats = pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  const totalStats = stats.reduce(
    (total: number, current) => total + current.value,
    0
  );

  const colorsArray = Object.entries(typeColors);

  return (
    <div className="flex flex-col w-full">
      <span className="text-center font-bold">Stats</span>
      <div className="flex flex-row w-full justify-between">
        {stats.map((stat, index) => {
          return (
            <StatsBadge
              key={index}
              color={colorsArray[index][1]}
              name={getTrigram(stat.name)}
              value={stat.value}
            />
          );
        })}
        <StatsBadge color="#6b98db" name="TOT" value={totalStats} />
      </div>
    </div>
  );
};

const Description = ({ pokemon }: { pokemon: PokemonType }) => {
  const [species, setSpecies] = useState<PokemonSpeciesType>();
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchCurrentSpecies = async () => {
      const data = await fetchSpecies(pokemon.id);
      setSpecies(data);
    };

    const enDescription = species?.flavor_text_entries.find(
      (element) => element.language.name === "en"
    );

    setDescription(enDescription?.flavor_text || "No description");
    fetchCurrentSpecies();
  }, [pokemon, species]);

  return (
    <div className="text-center pt-4">
      <span className="font-bold">Description</span>
      <p className="text-gray-500 text-m text-justify">{description}</p>
    </div>
  );
};

const Metrics = ({ pokemon }: { pokemon: PokemonType }) => {
  const { weight, height } = pokemon;

  return (
    <div className="flex flex-row w-full space-x-2">
      <div className="w-1/2 flex flex-col items-center">
        <span className="font-bold">Height</span>
        <div className="bg-gray-200 rounded-full py-2 w-full text-center">
          <span>{height / 10}m</span>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center">
        <span className="font-bold">Weight</span>
        <div className="bg-gray-200 rounded-full py-2 w-full text-center">
          <span>{weight / 10}kg</span>
        </div>
      </div>
    </div>
  );
};

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
