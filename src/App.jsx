import { Button } from "./components/Button.jsx";
import { Card } from "./components/Card.jsx";

import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import './sass/App.scss';

import { useState, useEffect } from "react";

export const App = () => {

  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvolutions, setPokemonsEvolutions] = useState([]);
  
  useEffect(() => {
    getEvolutions(pokemonId);
  }, [pokemonId]);

  async function getEvolutions(id) {
    const responseApi         = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
    const dataApi             = await responseApi.json();
    let pokemonEvolutionArray = [];
    let pokemonLv1            = dataApi.chain.species.name;
    let pokemonLv1Img         = await getPokemonImages(pokemonLv1);
    pokemonEvolutionArray.push([pokemonLv1, pokemonLv1Img]);
    
    if (dataApi.chain.evolves_to.length !== 0) {
      let pokemonLv2    = dataApi.chain.evolves_to[0].species.name;
      let pokemonLv2Img = await getPokemonImages(pokemonLv2);
      pokemonEvolutionArray.push([pokemonLv2, pokemonLv2Img]);
      
      if (dataApi.chain.evolves_to[0].evolves_to.length !== 0) {
        let pokemonLv3    = dataApi.chain.evolves_to[0].evolves_to[0].species.name;
        let pokemonLv3Img = await getPokemonImages(pokemonLv3);
        pokemonEvolutionArray.push([pokemonLv3, pokemonLv3Img]);
      };
    };
    setPokemonsEvolutions(pokemonEvolutionArray);
  };

  async function getPokemonImages(pokemonName) {
    const responseApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
    const dataApi     = await responseApi.json();

    return dataApi.sprites.other['official-artwork'].front_default;
  };

  const prevClick = () => {
    return pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1); 
  };

  const nextClick = () => setPokemonId(pokemonId + 1);

  return(
    <div className="app">
      <div className={`card-container card${pokemonEvolutions.length}`}>
        {pokemonEvolutions.map((pokemon) => {
          return(
            <Card 
              key={pokemon[0]}
              pokemonName={pokemon[0]}
              pokemonImage={pokemon[1]}
            />
          );
        })}
      </div>
      <div className="buttons-container">
        <Button 
          icon={<TiArrowLeftOutline />}
          handleClick={prevClick}
        />
        <Button 
          icon={<TiArrowRightOutline />}
          handleClick={nextClick}
        />
      </div>
    </div>
  );
};
