import { useState, useEffect } from 'react';
import Location from './components/Location';
import Pokemon from './components/Pokemon';

function App() {
  const [allLocations, setAllLocations] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/location');
        const data = await response.json();
        setAllLocations(data.results);
      } catch (err) {
        console.error(`Error fetching the locations ${err}`);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!clicked) {
      document.body.style.backgroundImage = 'url(src/images/forest.jpg)';
      document.body.style.backgroundPosition = '';
    } else {
      document.body.style.backgroundImage = 'url(src/images/chrysope-battle-background-new.jpg)';
      document.body.style.backgroundPosition = 'center';
    }
  }, [clicked]);

  return (
    <>
      {clicked ? (
        <Pokemon location={currentLocation} clicked={setClicked}/>
      ) : (
        <div className="locations-container">
          {allLocations &&
            allLocations.map((location, index) => <Location key={index} name={location.name} url={location.url} clicked={setClicked} currentLocation={setCurrentLocation} />)}
        </div>
      )}
    </>
  );
}

export default App;
