import ProgressBar from './ProgressBar';

function AllyPokemonCard({ pokemon, getPreviousPokemon, getNextPokemon }) {
  return (
    <div className="pokemonCard allyCard">
      <h2 id="PokemonCardName">{pokemon.name}</h2>
      <img src={pokemon.sprites.other['official-artwork']['front_default']}></img>
      {pokemon.stats.map((stat, index) => (
        <ProgressBar key={index} value={stat['base_stat']} name={stat.stat.name} />
      ))}
      <button onClick={getPreviousPokemon} className="previous">
        Previous
      </button>
      <button onClick={getNextPokemon} className="next">
        Next
      </button>
    </div>
  );
}

export default AllyPokemonCard;
