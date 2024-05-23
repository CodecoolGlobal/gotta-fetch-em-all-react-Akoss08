import Battle from './Battle';
import ProgressBar from './ProgressBar';
import { useState, useEffect } from 'react';

function Pokemon(pokemon) {
  const [currentUserPokemon, setCurrentUserPokemon] = useState(null);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [isBattleClicked, setIsBattleClicked] = useState(false);
  const [isDead, setIsDead] = useState(false);

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
        <h2 id="PokemonCardName">{pokemon.enemyPokemonName}</h2>
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
    if (isDead) {
      return <img id="userPokemonModel" src={currentUserPokemon.sprites['back_default']} style={{ display: 'none' }}></img>;
    }
  }

  function handleBattle() {
    setIsBattleClicked(true);
  }

  if (isBattleClicked) {
    return (
      <>
        {renderEnemyPokemonModel()}
        <Battle
          currentAllyPokemon={currentUserPokemon}
          enemyPokemonStats={pokemon.enemyPokemonStats}
          allyPokemon={currentUserPokemon}
          handleBackClick={pokemon.handleBackClick}
          enemyPokemonName={pokemon.enemyPokemonName}
          setUserPokemons={pokemon.setUserPokemons}
          userPokemons={pokemon.userPokemons}
          setIsLocationClicked={pokemon.isLocationClicked}
          setIsDead={setIsDead}
        />
        {renderUserPokemonModel()}
      </>
    );
  } else {
    return (
      <>
        {renderEnemyPokemonCard()}
        {renderEnemyPokemonModel()}
        <div>
          <button className="runButton" onClick={pokemon.handleBackClick}>
            Runaway
          </button>
          <button className="attackButton" onClick={handleBattle}>
            Battle
          </button>
        </div>
        {currentUserPokemon && renderUserPokemonCard()}
        {renderUserPokemonModel()}
      </>
    );
  }
}

export default Pokemon;
