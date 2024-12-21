import React, { useState, useEffect } from 'react';
import '../index.css'; // Import the CSS file



function PokemonGrid() {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [sortOrder, setSortOrder] = useState('name'); // Default sort by name

  // Types for the filter dropdown
  const pokemonTypes = [
    'All', 'Fire', 'Water', 'Grass', 'Electric', 'Bug', 'Normal', 'Fairy', 'Poison', 'Ground'
  ];

  // Fetching Pokémon data
  useEffect(() => {
    // Step 1: Fetch the list of Pokémon (names and URLs)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then((response) => response.json())
      .then((data) => {
        // Step 2: Fetch details for each Pokémon (including types)
        const promises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );

        Promise.all(promises).then((pokemonData) => {
          const pokemonsWithTypes = pokemonData.map((data) => ({
            name: data.name,
            id: data.id,
            types: data.types ? data.types.map((type) => type.type.name) : [],
            sprite: data.sprites.front_default,
          }));

          setPokemons(pokemonsWithTypes);
          setFilteredPokemons(pokemonsWithTypes); // Set the initial filtered data to all Pokémon
        });
      });
  }, []);

  // Handle Search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle Sorting
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter Pokémon by name and type
  useEffect(() => {
    let updatedPokemons = pokemons;

    // Filter by name
    if (searchQuery) {
      updatedPokemons = updatedPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType && selectedType !== 'All') {
      updatedPokemons = updatedPokemons.filter((pokemon) =>
        pokemon.types.includes(selectedType.toLowerCase())
      );
    }

    // Sort Pokémon based on the selected criterion
    if (sortOrder === 'id') {
      updatedPokemons = updatedPokemons.sort((a, b) =>
        a.name.localeCompare(b.name) // Sorting alphabetically by name
      );
    } else if (sortOrder === 'name') {
      updatedPokemons = updatedPokemons.sort((a, b) => a.id - b.id); // Sorting by ID
    }

    setFilteredPokemons(updatedPokemons);
  }, [searchQuery, selectedType, sortOrder, pokemons]);

  return (
    <div className="container">
      <h1>Pokémon Explorer</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for Pokémon"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Type Filter */}
      <div className="filter-container">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="filter-select"
        >
          {pokemonTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div className="filter-container">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="filter-select"
        >
          <option value="name">Sort by Name</option>
          <option value="id">Sort by ID</option>
        </select>
      </div>

      {/* Pokémon Grid */}
      <div className="pokemon-grid">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon, index) => (
            <div key={index} className="pokemon-card">
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="pokemon-img"
              />
              <h2>{pokemon.name}</h2>
              <p><strong>ID:</strong> {pokemon.id}</p> {/* Display Pokémon ID */}
              <div className="pokemon-types">
                {pokemon.types && pokemon.types.length > 0 ? (
                  pokemon.types.map((type, index) => (
                    <span key={index} className={`pokemon-type ${type}`}>
                      {type}
                    </span>
                  ))
                ) : (
                  <span>No Types Available</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No Pokémon found.</p>
        )}
      </div>

      {/* Load More Button */}
      <button className="load-more">Load More</button>
    </div>
  );
}

export default PokemonGrid;
