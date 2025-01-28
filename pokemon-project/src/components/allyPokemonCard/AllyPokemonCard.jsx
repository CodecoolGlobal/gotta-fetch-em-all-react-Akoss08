import ProgressBar from '../progressBar/ProgressBar';
import './allyPokemonCard.css';

function AllyPokemonCard({ pokemon, getPreviousPokemon, getNextPokemon, isFirst, isLast }) {
  console.log(isFirst);
  return (
    <div className="pokemonCard allyCard">
      <h2 id="PokemonCardName">{pokemon.name}</h2>
      <img src={pokemon.sprites.other['official-artwork']['front_default']}></img>
      {pokemon.stats.map((stat, index) => (
        <ProgressBar key={index} value={stat['base_stat']} name={stat.stat.name} />
      ))}
      <button onClick={getPreviousPokemon} className="previous" disabled={isFirst()}>
        Previous
      </button>
      <button onClick={getNextPokemon} className="next" disabled={isLast()}>
        Next
      </button>
    </div>
  );
}

export default AllyPokemonCard;
