import { useState, useEffect } from 'react';
import Location from './components/Location';
import Pokemon from './components/Pokemon';

function App() {
  const [locations, setLocation] = useState(null);
  const [isLocationClicked, setIsLocationClicked] = useState(false);
  const [currentEnemyPokemon, setCurrentEnemyPokemon] = useState(null);

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
      <div className="LocationContainer">
        {locations?.map((location, index) => (
          <Location key={index} name={location.name} url={location.url} setIsLocationClicked={setIsLocationClicked} setCurrentEnemyPokemon={setCurrentEnemyPokemon} />
        ))}
      </div>
    );
  }

  function renderPokemon() {
    if (currentEnemyPokemon) {
      return (
        <>
          {currentEnemyPokemon && (
            <Pokemon
              img={currentEnemyPokemon.sprites.other['official-artwork']['front_default']}
              stats={currentEnemyPokemon.stats}
              pokemonName={currentEnemyPokemon.name}
              handleBackClick={handleBackClick}
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

  if (isLocationClicked) {
    return renderPokemon();
  } else {
    return renderLocations();
  }
}

export default App;
