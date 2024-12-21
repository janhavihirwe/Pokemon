import React from 'react';

const PokemonTypeFilter = ({ types, onFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-center space-x-4 mb-6 gap-4">
      <button
        onClick={() => onFilterChange('')}
        className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
      >
        All
      </button>
      {types.map((type) => (
        <button
          key={type.name}
          onClick={() => onFilterChange(type.name)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};

export default PokemonTypeFilter;
