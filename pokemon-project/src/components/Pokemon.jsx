import { useEffect, useState } from 'react';

function Pokemon({ location, clicked }) {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonSprite, setPokemonSprite] = useState('');
  

  useEffect(() => {
    async function getPokemonDetails() {
      const areas = location.areas;
      if (location && areas.length > 0) {
        const areaIndex = Math.floor(Math.random() * areas.length);
        const areaUrl = areas[areaIndex].url;
        const response = await fetch(areaUrl);
        const area = await response.json();
        console.log(area);
        console.log(location)

        const pokemonIndex = Math.floor(Math.random() * area.pokemon_encounters.length);
        const pokemonUrl = area.pokemon_encounters[pokemonIndex].pokemon.url;
        const res = await fetch(pokemonUrl);
        const pokemon = await res.json();
        console.log(pokemon);

        const pokemonFormsUrl = pokemon.forms[0].url;
        const resp = await fetch(pokemonFormsUrl);
        const pokemonForms = await resp.json();
        console.log(pokemonForms);

        setPokemonName(area.pokemon_encounters[pokemonIndex].pokemon.name);
        setPokemonSprite(pokemonForms.sprites.front_default);
      } else if (location) {
        setPokemonName('No Pokemon');
        setPokemonSprite('');
      }
    }
    if (location) {
      getPokemonDetails();
    }
  }, [location]);

  function handleBackClick() {
    clicked(false);
  }

  return (
    <>
      {location ? (
        <>
          <div className="enemy-pokemon">
            <h1> {pokemonName}</h1>
            <img src={pokemonSprite}></img>
          </div>
          <button onClick={handleBackClick}>Back</button>
        </>
      ) : (
        <h1>...Loading</h1>
      )}
    </>
  );
}

export default Pokemon;
