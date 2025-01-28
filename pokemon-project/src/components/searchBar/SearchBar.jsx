import './searchBar.css';

function SearchBar({ searchTerm, onSearchChange, onSearchReset }) {
  return (
    <>
      <input className="pokedexFilter" type="text" value={searchTerm} onChange={onSearchChange} placeholder="Search Pokémon..." />
      <button className="resetButton" onClick={onSearchReset}>
        Reset
      </button>
    </>
  );
}

export default SearchBar;
