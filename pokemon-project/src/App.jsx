import { useState, useEffect } from 'react';
import Location from './components/Location';

function App() {
  const [locations, setLocation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/location');
        const data = await response.json();
        setLocation(data);
      } catch (err) {
        console.error(`Error fetching the locations ${err}`);
      }
    }

    fetchData();
  }, []);

  return <>{locations &&  locations.results.map((location) => <Location location={location}></Location>)}</>;
}

export default App;
