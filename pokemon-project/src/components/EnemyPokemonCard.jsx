import ProgressBar from './ProgressBar';

function EnemyPokemonCard({ pokemon }) {
  return (
    <div className="pokemonCard enemyCard">
      <h2 id="PokemonCardName">{pokemon.name}</h2>
      <img src={pokemon.sprites.other['official-artwork']['front_default']}></img>
      {pokemon.stats.map((stat, index) => (
        <ProgressBar key={index} value={stat['base_stat']} name={stat.stat.name} />
      ))}
    </div>
  );
}

export default EnemyPokemonCard;
