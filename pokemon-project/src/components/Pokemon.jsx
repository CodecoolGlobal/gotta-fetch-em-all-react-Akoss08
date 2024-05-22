import ProgressBar from './ProgressBar';

function Pokemon(pokemon) {
  return (
    <>
      <div className="enemyPokemonCard">
        <h2 id="enemyPokemonCardName">{pokemon.enemyPokemonName}</h2>
        <img src={pokemon.enemyPokemonImg}></img>
        {pokemon.enemyPokemonStats.map((stat, index) => (
          <ProgressBar key={index} value={stat['base_stat']} name={stat.stat.name}></ProgressBar>
        ))}
      </div>
      <button className="optionButton" onClick={pokemon.handleBackClick}>
        Runaway
      </button>
    </>
  );
}

export default Pokemon;
