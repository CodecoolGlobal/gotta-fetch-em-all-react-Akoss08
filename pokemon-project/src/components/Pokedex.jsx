import { useEffect, useState } from 'react';
import PokedexCard from './PokedexCard';
import TypeIcons from './TypeIcons';

function Pokedex(props) {
  const [allPokemons, setAllPokemons] = useState([]);
  const [currentPagePokemons, setCurrentPagePokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [pokemonSelected, setPokemonSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=1302');

  const TYPE_LIST = [
    { name: 'fire', url: 'https://archives.bulbagarden.net/media/upload/b/b3/Fire_icon_Sleep.png' },
    { name: 'water', url: 'https://archives.bulbagarden.net/media/upload/2/25/Water_icon_Sleep.png' },
    { name: 'electric', url: 'https://archives.bulbagarden.net/media/upload/4/4c/Electric_icon_Sleep.png' },
    { name: 'dark', url: 'https://archives.bulbagarden.net/media/upload/1/18/Dark_icon_Sleep.png' },
    { name: 'bug', url: 'https://archives.bulbagarden.net/media/upload/2/24/Bug_icon_Sleep.png' },
    { name: 'dragon', url: 'https://archives.bulbagarden.net/media/upload/8/83/Dragon_icon_Sleep.png' },
    { name: 'fairy', url: 'https://archives.bulbagarden.net/media/upload/2/20/Fairy_icon_Sleep.png' },
    { name: 'fighting', url: 'https://archives.bulbagarden.net/media/upload/e/ed/Fighting_icon_Sleep.png' },
    { name: 'flying', url: 'https://archives.bulbagarden.net/media/upload/3/3c/Flying_icon_Sleep.png' },
    { name: 'ghost', url: 'https://archives.bulbagarden.net/media/upload/e/e3/Ghost_icon_Sleep.png' },
    { name: 'grass', url: 'https://archives.bulbagarden.net/media/upload/e/ef/Grass_icon_Sleep.png' },
    { name: 'ground', url: 'https://archives.bulbagarden.net/media/upload/2/2b/Ground_icon_Sleep.png' },
    { name: 'ice', url: 'https://archives.bulbagarden.net/media/upload/d/d8/Ice_icon_Sleep.png' },
    { name: 'normal', url: 'https://archives.bulbagarden.net/media/upload/e/eb/Normal_icon_Sleep.png' },
    { name: 'poison', url: 'https://archives.bulbagarden.net/media/upload/3/31/Poison_icon_Sleep.png' },
    { name: 'psychic', url: 'https://archives.bulbagarden.net/media/upload/6/6e/Psychic_icon_Sleep.png' },
    { name: 'rock', url: 'https://archives.bulbagarden.net/media/upload/d/de/Rock_icon_Sleep.png' },
    { name: 'steel', url: 'https://archives.bulbagarden.net/media/upload/c/c6/Steel_icon_Sleep.png' },
  ];

  useEffect(() => {
    async function fetchAllPokemons() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (url === 'https://pokeapi.co/api/v2/pokemon?limit=1302') {
          setAllPokemons(data.results);
        } else {
          setAllPokemons(data.pokemon);
        }
      } catch (err) {
        console.error('Error fetching the pokemons');
      }
    }
    fetchAllPokemons();
  }, [url]);

  useEffect(() => {
    async function fetchCurrentPagePokemons() {
      if (searchTerm) {
        if (url === 'https://pokeapi.co/api/v2/pokemon?limit=1302') {
          const filteredResults = allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));

          const firstPokemonId = (page - 1) * 15;
          const lastPokemonId = firstPokemonId + 15;
          const pageResults = filteredResults.slice(firstPokemonId, lastPokemonId);

          const pokemonPromises = pageResults.map(async (pokemon) => {
            const pokemonDataResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonDataResponse.json();

            return pokemonData;
          });

          const pokemonsData = await Promise.all(pokemonPromises);
          setCurrentPagePokemons(pokemonsData);
        } else {
          const filteredResults = allPokemons.filter((pokemon) => pokemon.pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));

          const firstPokemonId = (page - 1) * 15;
          const lastPokemonId = firstPokemonId + 15;
          const pageResults = filteredResults.slice(firstPokemonId, lastPokemonId);

          const pokemonPromises = pageResults.map(async (pokemon) => {
            const pokemonDataResponse = await fetch(pokemon.pokemon.url);
            const pokemonData = await pokemonDataResponse.json();

            return pokemonData;
          });

          const pokemonsData = await Promise.all(pokemonPromises);
          setCurrentPagePokemons(pokemonsData);
        }
      } else {
        const firstPokemonId = (page - 1) * 15;
        const lastPokemonId = firstPokemonId + 15;
        const pageResults = allPokemons.slice(firstPokemonId, lastPokemonId);

        const pokemonPromises = pageResults.map(async (pokemon) => {
          if (url === 'https://pokeapi.co/api/v2/pokemon?limit=1302') {
            const pokemonDataResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonDataResponse.json();
            return pokemonData;
          } else {
            const pokemonDataResponse = await fetch(pokemon.pokemon.url);
            const pokemonData = await pokemonDataResponse.json();
            return pokemonData;
          }
        });

        const pokemonsData = await Promise.all(pokemonPromises);
        setCurrentPagePokemons(pokemonsData);
      }
    }
    fetchCurrentPagePokemons();
  }, [page, searchTerm, allPokemons, url]);

  function handleNextButton() {
    setPage(page + 1);
  }

  function handlePreviousButton() {
    setPage(page - 1);
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    setPage(1);
  }

  if (!pokemonSelected) {
    return (
      <>
        <div className="searchBar">
          <input id="pokedexFilter" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search Pokémon" />
          <button id="backToAllButton" onClick={() => setUrl('https://pokeapi.co/api/v2/pokemon?limit=1302')}>
            All
          </button>
          <div className="typeIcons">
            {TYPE_LIST.map((type, index) => (
              <TypeIcons key={index} image={type.url} type={`https://pokeapi.co/api/v2/type/${type.name}`} handleClick={setUrl}></TypeIcons>
            ))}
          </div>
        </div>
        <div className="pokedexContainer">
          {currentPagePokemons &&
            currentPagePokemons.map((pokemon, index) => (
              <img
                key={index}
                src={pokemon.sprites['front_default'] ? pokemon.sprites['front_default'] : pokemon.sprites.other['official-artwork']['front_default']}
                onClick={() => setPokemonSelected(pokemon)}
              />
            ))}
          <div className="pokedexButtonContainer">
            <button className="pokedexButton" onClick={handlePreviousButton} disabled={page === 1}>
              Previous page
            </button>
            <button className="pokedexButton" onClick={() => props.handleBackClick(false)}>
              Home
            </button>
            <button className="pokedexButton" onClick={handleNextButton} disabled={currentPagePokemons.length < 15}>
              Next page
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return <PokedexCard data={pokemonSelected} handleBackClick={setPokemonSelected}></PokedexCard>;
  }
}

export default Pokedex;
