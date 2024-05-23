import { useEffect, useState } from 'react';
import PokedexCard from './PokedexCard';

function Pokedex(props) {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [pokemonSelected, setPokemonSelected] = useState(null);

  useEffect(() => {
    async function fetchAllPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
        const data = await response.json();
        const pokemonPromises = data.results.slice(page - 1, page + 14).map(async (pokemon) => {
          const pokemonDataResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonDataResponse.json();
          return pokemonData;
        });

        const pokemonsData = await Promise.all(pokemonPromises);
        setPokemons(pokemonsData);
      } catch (err) {
        console.error(`Error fetching the pokemons `);
      }
    }
    fetchAllPokemons();
  }, [page]);

  function handleNextButton() {
    setPage(page + 14);
  }

  function handlePreviousButton() {
    setPage(page - 14);
  }

  if (!pokemonSelected) {
    return (
      <div className="pokedexContainer">
        {pokemons && pokemons.map((pokemon, index) => <img key={index} src={pokemon.sprites['front_default']} onClick={() => setPokemonSelected(pokemon)}></img>)}
        <div className="pokedexButtonContainer">
          <button className="pokedexButton" onClick={handlePreviousButton}>
            Previous page
          </button>
          <button className="pokedexButton" onClick={() => props.handleBackClick(false)}>
            Home
          </button>
          <button className="pokedexButton" onClick={handleNextButton}>
            Next page
          </button>
        </div>
      </div>
    );
  } else {
    return <PokedexCard data={pokemonSelected} handleBackClick={setPokemonSelected}></PokedexCard>;
  }
}

export default Pokedex;
