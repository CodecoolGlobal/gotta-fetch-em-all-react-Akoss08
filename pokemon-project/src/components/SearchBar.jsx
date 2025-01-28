function SearchBar({ searchTerm, onSearchChange, onSearchReset }) {
  return (
    <>
      <input id="pokedexFilter" type="text" value={searchTerm} onChange={onSearchChange} placeholder="Search Pokémon..." />
      <button id="backToAllButton" onClick={onSearchReset}>
        Reset
      </button>
    </>
  );
}

export default SearchBar;
