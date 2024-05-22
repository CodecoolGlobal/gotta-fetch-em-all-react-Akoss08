import ProgressBar from './ProgressBar';
import { useState, useEffect } from 'react';

function Pokemon(pokemon) {
  const [currentUserPokemon, setCurrentUserPokemon] = useState(null);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);

  function getNextPokemon() {
    if (currentPokemonIndex !== pokemon.userPokemons.length - 1) {
      setCurrentPokemonIndex(currentPokemonIndex + 1);
    }
  }

  function getPreviousPokemon() {
    if (currentPokemonIndex !== 0) {
      setCurrentPokemonIndex(currentPokemonIndex - 1);
    }
  }

  useEffect(() => {
    async function fetchPokemonInfo() {
      const response = await fetch(pokemon.userPokemons[currentPokemonIndex]);
      const data = await response.json();
      setCurrentUserPokemon(data);
    }

    fetchPokemonInfo();
  }, [currentPokemonIndex]);

  function renderEnemyPokemonCard() {
    return (
      <div className="enemyPokemonCard">
        <h2 id="enemyPokemonCardName">{pokemon.enemyPokemonName}</h2>
        <img src={pokemon.enemyPokemonImg}></img>
        {pokemon.enemyPokemonStats.map((stat, index) => (
          <ProgressBar key={index} value={stat['base_stat']} name={stat.stat.name}></ProgressBar>
        ))}
      </div>
    );
  }

  function renderUserPokemonCard() {
    return (
      <div className="pokemonCard">
        <h2 id="PokemonCardName">{currentUserPokemon.name}</h2>
        <img src={currentUserPokemon.sprites.other['official-artwork']['front_default']}></img>
        {currentUserPokemon.stats.map((stat, index) => (
          <ProgressBar key={index} value={stat['base_stat']} name={stat.stat.name}></ProgressBar>
        ))}
        <button onClick={getPreviousPokemon}>Previous</button>
        <button onClick={getNextPokemon}>Next</button>
      </div>
    );
  }

  function renderEnemyPokemonModel() {
    return <img id="enemyPokemonModel" src={pokemon.enemyPokemonModel}></img>;
  }

  function renderUserPokemonModel() {
    if (currentUserPokemon) {
      return <img id="userPokemonModel" src={currentUserPokemon.sprites['back_default']}></img>;
    }
  }

  return (
    <>
      {renderEnemyPokemonCard()}
      {renderEnemyPokemonModel()}
      <button className="optionButton" onClick={pokemon.handleBackClick}>
        Runaway
      </button>
      {currentUserPokemon && renderUserPokemonCard()}
      {renderUserPokemonModel()}
    </>
  );
}

export default Pokemon;
