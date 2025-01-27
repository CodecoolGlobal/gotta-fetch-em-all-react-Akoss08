import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Location from './Location';

function HomePage() {
  const [locations, setLocations] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();
// localStorage.clear();
  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/location?offset=${pageNumber}&limit=20`);
        const locations = await response.json();
        setLocations(locations.results);
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    }

    fetchLocations();
  }, [pageNumber]);

  return (
    <div className='pageWrapper'>
      <img id="pokedexButton" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" onClick={() => navigate('/pokedex')} alt="Pokedex" />
      <div className="LocationContainer">
        {locations?.map((location, index) => (
          <Location key={index} locationName={location.name} locationUrl={location.url} />
        ))}
      </div>
      <button className="pageBack" onClick={() => setPageNumber(Math.max(0, pageNumber - 20))}>Back</button>
      <button className="pageNext" onClick={() => setPageNumber(pageNumber + 20)}>Next</button>
    </div>
  );
}

export default HomePage;
