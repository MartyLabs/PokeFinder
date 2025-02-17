import { FaSearch } from "react-icons/fa";
import { SearchBarProps } from "../../types";

const SearchBar = (props: SearchBarProps) => {
  const { onChange } = props;

  return (
    <div className="w-full rounded-xl px-4 py-3 bg-white shadow-md focus:outline-none flex flex-row">
      <input
        className="w-full focus:outline-none"
        type="text"
        placeholder="Search pokemon..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
      <button className="bg-[#fe5353] rounded-lg p-3 shadow-md cursor-pointer">
        <FaSearch className="text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
