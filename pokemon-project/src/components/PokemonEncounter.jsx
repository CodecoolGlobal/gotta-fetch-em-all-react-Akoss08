import { useLocation, useNavigate } from 'react-router-dom';
import Battle from './Battle';
import { useState, useEffect } from 'react';
import EnemyPokemonCard from './EnemyPokemonCard';
import AllyPokemonCard from './AllyPokemonCard';
import PokemonModel from './PokemonModel';

function PokemonEncounter() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locationUrl } = location.state;

  const storedAllyPokemons = JSON.parse(localStorage.getItem('allyPokemons')) || [
    'https://pokeapi.co/api/v2/pokemon/wailord',
    'https://pokeapi.co/api/v2/pokemon/mewtwo',
    'https://pokeapi.co/api/v2/pokemon/gengar',
  ];

  const [allyPokemons, setAllyPokemons] = useState(storedAllyPokemons);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [isEmptyLocation, setIsEmptyLocation] = useState(false);
  const [selectedAllyPokemon, setSelectedAllyPokemon] = useState(null);
  const [isDead, setIsDead] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [isBattleStarted, setIsBattleStarted] = useState(false);

  useEffect(() => {
    async function fetchEnemyPokemon() {
      try {
        const locationResponse = await fetch(locationUrl);
        const location = await locationResponse.json();

        if (location.areas.length) {
          const randomIndex = Math.floor(Math.random() * location.areas.length);
          const areaResponse = await fetch(location.areas[randomIndex].url);
          const area = await areaResponse.json();

          const pokemonResponse = await fetch(area['pokemon_encounters'][Math.floor(Math.random() * area['pokemon_encounters'].length)].pokemon.url);
          const pokemon = await pokemonResponse.json();

          setEnemyPokemon(pokemon);
        } else {
          setIsEmptyLocation(true);
        }
      } catch (error) {
        console.error(`Error fetching from ${locationUrl}`);
      }
    }

    fetchEnemyPokemon();
  }, [locationUrl]);

  useEffect(() => {
    async function fetchPokemonInfo() {
      const response = await fetch(allyPokemons[currentPokemonIndex]);
      const data = await response.json();
      setSelectedAllyPokemon(data);
    }

    fetchPokemonInfo();
  }, [currentPokemonIndex]);

  useEffect(() => {
    localStorage.setItem('allyPokemons', JSON.stringify(allyPokemons));
  }, [allyPokemons]);

  function getNextPokemon() {
    if (currentPokemonIndex < allyPokemons.length - 1) {
      setCurrentPokemonIndex(currentPokemonIndex + 1);
    }
  }

  function getPreviousPokemon() {
    if (currentPokemonIndex > 0) {
      setCurrentPokemonIndex(currentPokemonIndex - 1);
    }
  }

  function getSpriteUrl(pokemon, type = 'front') {
    return pokemon?.sprites?.other?.showdown?.[`${type}_default`];
  }

  return (
    <div className="battleGround">
      {isEmptyLocation && <h1>No Pokemon found here!</h1>}

      {isBattleStarted && (
        <Battle allyPokemon={selectedAllyPokemon} enemyPokemon={enemyPokemon} setIsCaught={setIsCaught} setIsDead={setIsDead} setAllyPokemons={setAllyPokemons} />
      )}

      {enemyPokemon && (
        <>
          <EnemyPokemonCard pokemon={enemyPokemon} />
          <PokemonModel
            sprite={enemyPokemon.sprites.other.showdown['front_default']}
            isLost={isCaught}
            baseClass={'enemyPokemonModel'}
            lostBattleClass={'caughtPokemon'}
          />
        </>
      )}

      <div>
        <button className="runButton" onClick={() => navigate('/')}>
          Runaway
        </button>
        <button className="attackButton">Battle</button>
      </div>

      {selectedAllyPokemon && (
        <>
          <AllyPokemonCard pokemon={selectedAllyPokemon} getPreviousPokemon={getPreviousPokemon} getNextPokemon={getNextPokemon} />
          <PokemonModel sprite={selectedAllyPokemon.sprites.other.showdown['back_default']} isLost={isDead} baseClass={'userPokemonModel'} lostBattleClass={'allyDead'} />
        </>
      )}
    </div>
  );
}

export default PokemonEncounter;
