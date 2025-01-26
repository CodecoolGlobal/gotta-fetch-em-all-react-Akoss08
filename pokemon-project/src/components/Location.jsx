import { useNavigate } from 'react-router-dom';

function Location({ locationName, locationUrl }) {
  const navigate = useNavigate();

  function handleLocationClick() {
    navigate(`/${locationName}`, { state: { locationUrl } });
  }

  return <h2 onClick={handleLocationClick}>{locationName}</h2>;
}

export default Location;
