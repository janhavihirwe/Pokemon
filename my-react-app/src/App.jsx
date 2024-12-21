import React from 'react';
import PokedexGrid from './components/PokedexGrod';

const App = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-center text-4xl font-bold mb-6">Pokemon Explorer</h1>
      <PokedexGrid />
    </div>
  );
};

export default App;
