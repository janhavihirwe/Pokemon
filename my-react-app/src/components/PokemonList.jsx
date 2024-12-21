import React, { useEffect, useState } from "react";

const PokemonList = ({ searchQuery }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=50`
      );
      const data = await response.json();
      setPokemons(data.results);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredPokemons.map((pokemon) => (
            <li key={pokemon.name} className="p-2">
              {pokemon.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonList;
