import { useState, useEffect } from 'react';
import Location from './components/Location';

function App() {
  const [locations, setLocation] = useState(null);
  const [isTherePokemon, setIsTherePokemon] = useState(true);
  const [isLocationClicked, setIsLocationClicked] = useState(false);

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

  return !isLocationClicked ? (
    <div className="LocationContainer">
      {locations &&
        locations.map((location, index) => (
          <Location key={index} name={location.name} url={location.url} setIsTherePokemon={setIsTherePokemon} setIsLocationClicked={setIsLocationClicked}></Location>
        ))}
    </div>
  ) : isTherePokemon ? (
    <div>
      <h2>There are pokemons here</h2>
    </div>
  ) : (
    <div>
      <h2>There are no pokemons here</h2>
      <button onClick={() => setIsLocationClicked(false)}>Back</button>
    </div>
  );
}

export default App;
