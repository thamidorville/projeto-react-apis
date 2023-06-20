import React, { createContext, useState } from 'react';

export const PokedexContext = createContext();

export const PokedexProvider = ({ children }) => {
  const [pokedex, setPokedex] = useState([]);

  const addToPokedex = (pokemon) => {
    if (!pokedex.find((p) => p.name === pokemon.name)) {
      setPokedex((prevPokedex) => [...prevPokedex, pokemon]);
    }
  };

  const removePokemonFromPokedex = (pokemonId) => {
    setPokedex((prevPokedex) => prevPokedex.filter((p) => p.id !== pokemonId));
  };

  return (
    <PokedexContext.Provider value={{ pokedex, addToPokedex, removePokemonFromPokedex }}>
      {children}
    </PokedexContext.Provider>
  );
};
