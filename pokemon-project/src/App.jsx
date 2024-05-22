import { useState, useEffect } from 'react';
import Location from './components/Location';
import Pokemon from './components/Pokemon';
import Pokedex from './components/Pokedex';

function App() {
  const [isPokedexClicked, setIsPokedexClicked] = useState(false);
  const [locations, setLocation] = useState(null);
  const [isLocationClicked, setIsLocationClicked] = useState(false);
  const [currentEnemyPokemon, setCurrentEnemyPokemon] = useState(null);
  const [userPokemons, setUserPokemons] = useState([
    'https://pokeapi.co/api/v2/pokemon/bulbasaur',
    'https://pokeapi.co/api/v2/pokemon/charizard',
    'https://pokeapi.co/api/v2/pokemon/poliwhirl',
  ]);

  useEffect(() => {
    if (!isLocationClicked) {
      document.body.style.backgroundImage = 'url(src/images/forest.jpg)';
      document.body.style.backgroundPosition = '';
    } else {
      document.body.style.backgroundImage = 'url(src/images/chrysope-battle-background-new.jpg)';
      document.body.style.backgroundPosition = 'center';
    }
  }, [isLocationClicked]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/location');
        const data = await response.json();
        setLocation(data.results);
      } catch (err) {
        console.error(`Error fetching the locations ${err}`);
      }
    }

    fetchData();
  }, []);

  const handleBackClick = () => {
    setIsLocationClicked(false);
  };

  function renderLocations() {
    return (
      <>
        <img id="pokedexButton" src={'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'} onClick={() => setIsPokedexClicked(true)}></img>
        <div className="LocationContainer">
          {locations?.map((location, index) => (
            <Location key={index} name={location.name} url={location.url} setIsLocationClicked={setIsLocationClicked} setCurrentEnemyPokemon={setCurrentEnemyPokemon} />
          ))}
        </div>
      </>
    );
  }

  function renderPokemons() {
    if (currentEnemyPokemon) {
      return (
        <>
          {currentEnemyPokemon && (
            <Pokemon
              enemyPokemonImg={currentEnemyPokemon.sprites.other['official-artwork']['front_default']}
              enemyPokemonModel={currentEnemyPokemon.sprites['front_default']}
              enemyPokemonStats={currentEnemyPokemon.stats}
              enemyPokemonName={currentEnemyPokemon.name}
              handleBackClick={handleBackClick}
              userPokemons={userPokemons}
            />
          )}
        </>
      );
    } else {
      return (
        <>
          <h2>There are no pokemons here</h2>
          <button onClick={handleBackClick}>Back</button>
        </>
      );
    }
  }

  function renderPokedex() {
    return <Pokedex></Pokedex>;
  }

  if (isLocationClicked) {
    return renderPokemons();
  } else {
    if (!isPokedexClicked) {
      return renderLocations();
    } else {
      return renderPokedex();
    }
  }
}

export default App;
