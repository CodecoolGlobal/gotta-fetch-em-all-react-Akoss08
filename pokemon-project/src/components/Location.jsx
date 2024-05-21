function Location(location) {
  async function getPokemonsByArea(url, setIsTherePokemon, setIsLocationClicked) {
    setIsLocationClicked(true);
    setIsTherePokemon(true);
    let randomIndex = 0;
    const locationResponse = await fetch(url);
    const location = await locationResponse.json();

    if (location.areas.length > 0) {
      randomIndex = Math.floor(Math.random() * location.areas.length);
    } else {
      setIsTherePokemon(false);
      return;
    }

    const areaResponse = await fetch(location.areas[randomIndex].url);
    const area = await areaResponse.json();

    const pokemonResponse = await fetch(area['pokemon_encounters'][Math.floor(Math.random() * area['pokemon_encounters'].length)].pokemon.url);
    const pokemon = await pokemonResponse.json();
  }

  return <h2 onClick={() => getPokemonsByArea(location.url, location.setIsTherePokemon, location.setIsLocationClicked)}>{location.name}</h2>;
}

export default Location;
