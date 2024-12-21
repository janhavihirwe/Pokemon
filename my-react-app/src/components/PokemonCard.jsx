import React from 'react';

const PokemonCard = ({ id, name, types, sprite }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl p-4 flex flex-col items-center">
      <img src={sprite} alt={name} className="w-32 h-32 mx-auto mt-4" />
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 mb-2">ID: #{id}</p>
        <div className="flex justify-center space-x-2">
          {types.map((type, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
