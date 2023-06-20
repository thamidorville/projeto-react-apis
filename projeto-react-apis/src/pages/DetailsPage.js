import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../image 1 (3).png";
import { PokedexContext } from "../context/PokedexContext";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #729f92;
  border-radius: 37.8857px;
  padding: 20px;
  margin: 100px;
`;

const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 16px;
`;

const PokemonInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const PokemonID = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px;
`;

const PokemonName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
`;

const PokemonTypes = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const PokemonType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  margin: 0 4px;
  background: #70b873;
  color: #fff;
  border-radius: 8px;
  font-size: 12px;
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
  border: 1px solid black;
  padding: 4rem;
  border-radius: 4px;
`;

const CardTitle = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
`;

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  list-style: none;
  padding: 1rem;
  margin: 0;
  color: white;
`;

const CardListItem = styled.li`
  margin-bottom: 4px;
  border: 2px solid black;
`;

const DeleteButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  background: #ff6262;
  border-radius: 8px;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  margin-top: 16px;
  cursor: pointer;
`;

const PokemonLogo = styled.img`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 200px;
  margin-top: 2rem;
`;

export const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {  removePokemonFromPokedex} = useContext(PokedexContext);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    getPokemonDetails();
  }, []);

  const getPokemonDetails = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromPokedex = () => {
    removePokemonFromPokedex(pokemon.id);
    navigate("/");
  };

  if (!pokemon) {
    return <p>Carregando...</p>;
  }

  return (
    <header>
      <PokemonLogo src={logo} alt="Pokemon Logo" />
      <CardContainer>
        <PokemonInfo>
          <PokemonID>#{pokemon.id}</PokemonID>
          <PokemonName>{pokemon.name}</PokemonName>
        </PokemonInfo>
        <PokemonCard>
          <PokemonImage src={pokemon.sprites.front_default} alt={pokemon.name} />
          <PokemonTypes>
            {pokemon.types.map((type, index) => (
              <PokemonType key={index}>{type.type.name}</PokemonType>
            ))}
          </PokemonTypes>
        </PokemonCard>
        <CardSection>
          <CardTitle>Base Stats</CardTitle>
          <CardList>
            {pokemon.stats.map((stat, index) => (
              <CardListItem key={index}>
                {stat.stat.name}: {stat.base_stat}
              </CardListItem>
            ))}
          </CardList>
        </CardSection>
        <CardSection>
          <CardTitle>Moves</CardTitle>
          <CardList>
            {pokemon.moves.slice(0, 5).map((move, index) => (
              <CardListItem key={index}>{move.move.name}</CardListItem>
            ))}
          </CardList>
        </CardSection>
        <DeleteButton onClick={handleRemoveFromPokedex}>
          Excluir da Pokédex
        </DeleteButton>
      </CardContainer>
    </header>
  );
};



