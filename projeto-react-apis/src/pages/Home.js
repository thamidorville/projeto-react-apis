import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../image 1 (3).png";
import styled from "styled-components";
import { PokedexContext } from "../context/PokedexContext";

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 200px;
  margin-top: 2rem;
`;

const PokedexButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  position: absolute;
  width: 227px;
  height: 54px;
  right: 20px;
  top: 20px;
  background: #33a4f5;
  border-radius: 8px;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
`;

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem;
  background-color: gray;
  padding: 20px;
`;

const PokemonCard = styled.div`
  position: relative;
  flex-basis: calc(33.33% - 20px);
  height: 210px;
  background: ${(props) => props.color};
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const CardButtons = styled.div`
  display: flex;
  justify-content: space-between;
 
`;

const PokemonTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const PokemonType = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  gap: 17px;
  width: 61px;
  height: 14px;
  background: #70b873;
  border: 1px dashed rgba(255, 255, 255, 0.47);
  border-radius: 8px;
  font-size: 12px;
`;

const TodosPokemons = styled.h1`
  margin: 2rem;
`;

const DetailsButton = styled(Link)`
  width: 74px;
  height: 24px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #ffffff;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const CatchButton = styled.button`
  display: flex;
  align-items:center;
  justify-items:center;
  justify-content:center;
  width: 78px;
  height: 24px;
  font-family: Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #0F0F0F;
  border-radius: 10px;
  margin: -10px 10px;

  flex: none;
  order: 0;
  flex-grow: 0;

`

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokedex, setPokedex] = useState([]);
  const { addToPokedex } = useContext(PokedexContext);
  const navigate = useNavigate();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=30");
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        })
      );
      setPokemons(pokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  const colors = ["#729F92", "#EAAB7D", "#71C3FF", "#76A866", "#BF9762"];

  const handleCapture = (pokemon) => {
    addToPokedex(pokemon);
    navigate("/pokedex");
  };

  return (
    <div>
      <header>
        <LogoContainer>
          <Logo src={logo} alt="logo pokemon" />
        </LogoContainer>
        <PokedexButton to="/pokedex">Pokedex</PokedexButton>
      </header>
      <TodosPokemons>Todos Pokémons</TodosPokemons>
      <PokemonList>
        {pokemons.map((pokemon, index) => (
          <PokemonCard key={index} color={colors[index % colors.length]}>
            <CardContent>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <PokemonTypes>
                {pokemon.types.map((type, index) => (
                  <PokemonType key={index}>{type.type.name}</PokemonType>
                ))}
              </PokemonTypes>
            </CardContent>
            <CardButtons>
              <DetailsButton to={`/pokemon/${pokemon.name}`}>Detalhes</DetailsButton>
              <CatchButton onClick={() => handleCapture(pokemon)}>Capturar</CatchButton>
            </CardButtons>
          </PokemonCard>
        ))}
      </PokemonList>
    </div>
  );
};


