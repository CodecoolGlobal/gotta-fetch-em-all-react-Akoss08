function Location(location) {
  async function getEnemyPokemonByArea(url, setIsLocationClicked, setCurrentEnemyPokemon) {
    try {
      let randomIndex = 0;
      const locationResponse = await fetch(url);
      const location = await locationResponse.json();

      if (location.areas.length > 0) {
        randomIndex = Math.floor(Math.random() * location.areas.length);
        const areaResponse = await fetch(location.areas[randomIndex].url);
        const area = await areaResponse.json();

        const pokemonResponse = await fetch(area['pokemon_encounters'][Math.floor(Math.random() * area['pokemon_encounters'].length)].pokemon.url);
        const pokemon = await pokemonResponse.json();
        console.log(pokemon);
        setCurrentEnemyPokemon(pokemon);
      } else {
        setCurrentEnemyPokemon(null);
      }
    } catch (err) {
      console.error(`Error fetching from ${url}`);
    } finally {
      setIsLocationClicked(true);
    }
  }

  return (
    <>
      <h2 onClick={() => getEnemyPokemonByArea(location.url, location.setIsLocationClicked, location.setCurrentEnemyPokemon)}>{location.name}</h2>
    </>
  );
}

export default Location;
