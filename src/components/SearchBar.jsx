import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
