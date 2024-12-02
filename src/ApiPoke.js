import React, { useState, useEffect } from "react";
import './ApiPoke.css'
function ApiPoke() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        fetchAllDetails(data.results);
      })
      .catch((error) => console.error("Error fetching Pokémon list:", error));
  }, []);
  const fetchAllDetails = (pokemonList) => {
    pokemonList.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
          setPokemonDetails((prevDetails) => ({
            ...prevDetails,
            [pokemon.name]: data,
          }));
        })
        .catch((error) =>
          console.error(`Error fetching details for ${pokemon.name}:`, error)
        );
    });
  };

  return (
    <div>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <strong>{pokemon.name}</strong>
            {pokemonDetails[pokemon.name] && (
              <div>
                <img
                  src={pokemonDetails[pokemon.name].sprites.front_default}
                  alt={pokemon.name}
                  style={{ width: "100px", height: "100px" }}
                />
                {pokemonDetails[pokemon.name].sprites.back_default && (
                  <img
                    src={pokemonDetails[pokemon.name].sprites.back_default}
                    alt={pokemon.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <span>Types:</span>
                <ul>
                  {pokemonDetails[pokemon.name].types.map((type, index) => (
                    <li key={index}>{type.type.name}</li>
                  ))}
                </ul>
                <span>Base Stats:</span>
                <ul>
                  {pokemonDetails[pokemon.name].stats.map((stat, index) => (
                    <li key={index}>
                      <span>{stat.stat.name.toUpperCase()}:</span> {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiPoke;
