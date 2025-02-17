import { PokemonType, StatsBadgeType } from "../../../types";
import { getTrigram, typeColors } from "../../../utils/utils";

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

export default Stats;
