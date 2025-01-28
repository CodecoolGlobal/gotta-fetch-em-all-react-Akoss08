import { useEffect, useState } from 'react';
import TypeFilter from '../../components/typeFilter/TypeFilter';
import SearchBar from '../../components/searchBar/SearchBar';
import Pagination from '../../components/pagination/Pagination';
import Pokemon from '../../components/pokemon/Pokemon';
import './pokedex.css';

const TYPE_LIST = [
  { name: 'fire', url: '/images/Fire_icon_Sleep.png' },
  { name: 'water', url: '/images/Water_icon_Sleep.png' },
  { name: 'electric', url: '/images/Electric_icon_Sleep.png' },
  { name: 'dark', url: '/images/Dark_icon_Sleep.png' },
  { name: 'bug', url: '/images/Bug_icon_Sleep.png' },
  { name: 'dragon', url: '/images/Dragon_icon_Sleep.png' },
  { name: 'fairy', url: '/images/Fairy_icon_Sleep.png' },
  { name: 'fighting', url: '/images/Fighting_icon_Sleep.png' },
  { name: 'flying', url: '/images/Flying_icon_Sleep.png' },
  { name: 'ghost', url: '/images/Ghost_icon_Sleep.png' },
  { name: 'grass', url: '/images/Grass_icon_Sleep.png' },
  { name: 'ground', url: '/images/Ground_icon_Sleep.png' },
  { name: 'ice', url: '/images/Ice_icon_Sleep.png' },
  { name: 'normal', url: '/images/Normal_icon_Sleep.png' },
  { name: 'poison', url: '/images/Poison_icon_Sleep.png' },
  { name: 'psychic', url: '/images/Psychic_icon_Sleep.png' },
  { name: 'rock', url: '/images/Rock_icon_Sleep.png' },
  { name: 'steel', url: '/images/Steel_icon_Sleep.png' },
];

function Pokedex() {
  const [currentPagePokemons, setCurrentPagePokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [allTypePokemons, setAllTypePokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [isTypeFilterActive, setIsTypeFilterActive] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => {
    async function fetchAllPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500');
        const data = await response.json();
        setAllPokemons(data.results);
      } catch (err) {
        console.error('Error fetching all Pokémon:', err);
      }
    }
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        if (!isTypeFilterActive && !searchTerm) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`);
          const pokemonData = await response.json();

          const pokemonDetails = await fetchPokemonDetails(pokemonData.results);

          setCurrentPagePokemons(pokemonDetails);
          setFilteredPokemons(pokemonDetails);
        } else if (isTypeFilterActive && !searchTerm) {
          const slicedPokemons = allTypePokemons.slice(offset, offset + itemsPerPage);
          setCurrentPagePokemons(slicedPokemons);
          setFilteredPokemons(slicedPokemons);
        } else if (!isTypeFilterActive && searchTerm) {
          const searchResults = filterPokemons(allPokemons);

          const detailedResults = await fetchPokemonDetails(searchResults);

          setCurrentPagePokemons(detailedResults);
          setFilteredPokemons(detailedResults);
        } else {
          const searchResults = filterPokemons(allTypePokemons);

          setCurrentPagePokemons(searchResults);
          setFilteredPokemons(searchResults);
        }
      } catch (err) {
        console.error(`Error fetching the pokemons: ${err}`);
      }
    }
    fetchPokemons();
  }, [offset, isTypeFilterActive, allTypePokemons, searchTerm]);

  async function handleIconClick(typeName) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
      const pokemonData = await response.json();

      const pokemonDetails = await fetchPokemonDetails(pokemonData.pokemon);
      setAllTypePokemons(pokemonDetails.filter((pokemon) => pokemon));
      setOffset(0);
      setIsTypeFilterActive(true);
    } catch (err) {
      console.error('Error fetching the Pokémon details:', err);
    }
  }

  function filterPokemons(pokemonList) {
    return pokemonList.filter((pokemon) => pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())).slice(offset, offset + itemsPerPage);
  }

  async function fetchPokemonDetails(pokemonList) {
    const pokemonDetails = await Promise.all(
      pokemonList.map(async (pokemon) => {
        try {
          const url = pokemon.url ? pokemon.url : pokemon.pokemon.url;
          const response = await fetch(url);

          if (!response.ok) throw new Error(`Error fetching data for ${pokemon.name}`);

          return await response.json();
        } catch (err) {
          console.error(`Failed to fetch ${pokemon.name}:`, err);
          return null;
        }
      })
    );
    return pokemonDetails.filter((pokemon) => pokemon);
  }

  function handleNextButton() {
    setOffset(offset + itemsPerPage);
  }

  function handlePreviousButton() {
    setOffset(offset - itemsPerPage);
  }

  function handleResetSearch() {
    setSearchTerm('');
    setIsTypeFilterActive(false);
    setOffset(0);
  }

  function isLastPage() {
    return currentPagePokemons.length < itemsPerPage;
  }

  return (
    <div className="pageWrapper">
      <div>
        <SearchBar searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} onSearchReset={handleResetSearch} />
        <TypeFilter typeList={TYPE_LIST} onIconClick={handleIconClick} />
      </div>
      <div className="pokedexContainer">
        {filteredPokemons.map((pokemon, index) => (
          <Pokemon pokemon={pokemon} key={pokemon.id || index} />
        ))}
        <Pagination offset={offset} onNextClick={handleNextButton} onPreviousClick={handlePreviousButton} isLastPage={isLastPage} />
      </div>
    </div>
  );
}

export default Pokedex;
