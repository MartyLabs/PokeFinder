import { useEffect, useState } from "react";
import { PokemonSpeciesType, PokemonType } from "../../../types";
import { fetchSpecies } from "../../../services/api";

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

export default Description;
