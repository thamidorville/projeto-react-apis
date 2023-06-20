import React, { useContext } from "react";
import styled from "styled-components";
import { PokedexContext } from "../context/PokedexContext";
import { Link } from "react-router-dom";
import logo from "../image 1 (3).png"

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #333;
`
const Logo = styled.img`
  height: 40px;
`;

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem;
  /* background-color: gray; */
  padding: 20px;
`;

const PokemonCard = styled.div`
  position: relative;
  flex-basis: calc(33.33% - 20px);
  height: 219px;
  background: ${(props) => props.color};
  border-radius: 12px;
  margin-bottom: 40px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
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

const RemoveButton = styled.button`
  width: 100px;
  height: 20px;
  background: #ff3636;
  border-radius: 8px;
  color: #fff;
  border: none;
  cursor: pointer;
`;
const BackButton = styled(Link)`
display: flex;
flex-direction: row;
width: 210px;
height: 36px;
left: 100px;
top: 62px;
margin: 10px;
font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 36px;
/* identical to box height */

text-decoration-line: underline;

color: white;
  cursor: pointer;
`;

export const Pokedex = () => {
  const { pokedex, removePokemonFromPokedex } = useContext(PokedexContext);

  const handleRemove = (pokemon) => {
    removePokemonFromPokedex(pokemon.id);
  };

  return (
    <>
       <Header>
        <BackButton to="/">Voltar para a Home</BackButton>
        <Logo src={logo} alt="Logo" />
      </Header>
    <PokemonList>
      {pokedex.map((pokemon) => (
        <PokemonCard key={pokemon.id} color="#729F92">
          <CardContent>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <PokemonTypes>
              {pokemon.types.map((type, index) => (
                <PokemonType key={index}>{type.type.name}</PokemonType>
              ))}
            </PokemonTypes>
          </CardContent>
          <div>
            <RemoveButton onClick={() => handleRemove(pokemon)}>
              Remover
            </RemoveButton>
            <Link to={`/pokemon/${pokemon.id}`}>Detalhes</Link>
          </div>
        </PokemonCard>
      ))}
    </PokemonList>
    </>
  );
};

