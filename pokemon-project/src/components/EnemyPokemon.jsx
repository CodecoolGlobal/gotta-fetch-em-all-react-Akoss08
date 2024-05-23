import ProgressBar from './ProgressBar';

function EnemyPokemon(pokemon) {
  return (
    <div className="pokemonCard">
      <h2 id="pokemonCardName">{pokemon.pokemonName}</h2>
      <img src={pokemon.img}></img>
      {pokemon.stats.map((stat, index) => (
        <ProgressBar key={index} value={stat['base_stat']} name={stat.stat.name}></ProgressBar>
      ))}
      <button onClick={pokemon.handleBackClick}>Back</button>
    </div>
  );
}

export default EnemyPokemon;
