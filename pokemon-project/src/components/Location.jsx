function Location(locationProps) {
  async function handleLocationClick(url, setClicked, setLocation) {
    setClicked(true);
    const response = await fetch(url);
    const location = await response.json();

    setLocation(location);
  }

  return <h2 onClick={() => handleLocationClick(locationProps.url, locationProps.clicked, locationProps.currentLocation)}>{locationProps.name}</h2>;
}

export default Location;
