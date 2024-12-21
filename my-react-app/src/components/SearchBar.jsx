import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search for a Pokémon"
      className="p-2 border rounded"
    />
  );
};

export default SearchBar;
