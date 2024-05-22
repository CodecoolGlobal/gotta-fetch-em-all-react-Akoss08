import { useState, useEffect } from 'react';
import Location from './components/Location';

function App() {
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/location');
        const data = await response.json();
        setLocations(data.results);
      } catch (err) {
        console.error(`Error fetching the locations ${err}`);
      }
    }

    fetchData();
  }, []);

  return <div className="location-container">{locations && locations.map((location, index) => <Location key={index} name={location.name} />)}</div>;
}

export default App;
