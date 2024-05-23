import { useState, useEffect } from 'react';
import Location from './components/Location';
import Pokemon from './components/Pokemon';
import Pokedex from './components/Pokedex';

function App() {
  const [isPokedexClicked, setIsPokedexClicked] = useState(false);
  const [locations, setLocation] = useState(null);
  const [page, setPage] = useState(`https://pokeapi.co/api/v2/location?`);
  const [pageNumber, setPageNumber] = useState(0)
  const [isLocationClicked, setIsLocationClicked] = useState(false);
  const [currentEnemyPokemon, setCurrentEnemyPokemon] = useState(null);
  const [userPokemons, setUserPokemons] = useState([
    'https://pokeapi.co/api/v2/pokemon/wailord',
    'https://pokeapi.co/api/v2/pokemon/mewtwo',
    'https://pokeapi.co/api/v2/pokemon/gengar',

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
        const response = await fetch(`${page}offset=${pageNumber}&limit=20`);
        const data = await response.json();
        setLocation(data.results);
      } catch (err) {
        console.error(`Error fetching the locations ${err}`);
      }
    }

    fetchData();
  }, [pageNumber]);

  const handleBackClick = () => {
    setIsLocationClicked(false);
  };

  function handleNextButton() {

    setPageNumber(pageNumber + 20)

  }

  function handleBackButton() {
    if (pageNumber > 0) {

      setPageNumber(pageNumber - 20)
    }

  }

  function renderLocations() {
    return (
      <>
        <img id="pokedexButton" src={'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'}
          onClick={() => setIsPokedexClicked(true)}></img>
        <div className="LocationContainer">

          {locations?.map((location, index) => (
            <Location key={index}
              name={location.name}
              url={location.url}
              setIsLocationClicked={setIsLocationClicked}
              setPage={setPage}
              setPageNumber={setPageNumber}
              setCurrentEnemyPokemon={setCurrentEnemyPokemon} />
          ))}
        </div>
        <button className='pageBack' onClick={handleBackButton}>Back</button>
        <button className='pageNext' onClick={handleNextButton}>Next</button>
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
              enemyPokemonModel={currentEnemyPokemon.sprites.other.showdown['front_default']}
              enemyPokemonStats={currentEnemyPokemon.stats}
              enemyPokemonName={currentEnemyPokemon.name}
              handleBackClick={handleBackClick}
              userPokemons={userPokemons}
              enemyPokemon={currentEnemyPokemon}
              setUserPokemons={setUserPokemons}
              isLocationClicked={setIsLocationClicked}
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
    return <Pokedex handleBackClick={setIsPokedexClicked}></Pokedex>;
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
