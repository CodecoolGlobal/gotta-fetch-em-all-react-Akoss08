import { useState, useEffect } from 'react';
import HealthBar from './HealthBar';

function Battle(properties) {
  const [allyHp, setAllyHp] = useState(properties.allyPokemon.stats[0].base_stat);
  const [enemyHp, setEnemyHp] = useState(properties.enemyPokemonStats[0].base_stat);

  useEffect(() => {
    if (enemyHp <= 0) {
      properties.setUserPokemons((prev) => [...prev, `https://pokeapi.co/api/v2/pokemon/${properties.enemyPokemonName}`]);
      properties.setIsCaught(true);
    } else if (allyHp <= 0) {
      properties.setUserPokemons((prev) => prev.filter((pokemon) => !pokemon.includes(properties.allyPokemon.name)));
      properties.setIsDead(true);
    }
  }, [enemyHp]);

  function handleReturnClick() {
    properties.setIsLocationClicked(false);
  }

  function handleAttack(currentUserPokemon, enemyPokemonStats) {
    const audio = new Audio('/src/components/audio/Wood Rattle.mp3');
    audio.play();
    const allyPokemonAttack = currentUserPokemon.stats[1].base_stat;
    const enemyPokemonAttack = enemyPokemonStats[1].base_stat;

    const allyPokemonDefense = currentUserPokemon.stats[2].base_stat;
    const enemyPokemonDefense = enemyPokemonStats[2].base_stat;

    const randomAllyInteger = Math.floor(Math.random() * 38) + 217;
    const randomEnemyInteger = Math.floor(Math.random() * 38) + 217;

    const allyDamageFormula = Math.round(((((2 / 5 + 2) * allyPokemonAttack * 120) / enemyPokemonDefense / 50 + 2) * randomAllyInteger) / 255);
    const enemyDamageFormula = Math.round(((((2 / 5 + 2) * enemyPokemonAttack * 120) / allyPokemonDefense / 50 + 2) * randomEnemyInteger) / 255);

    const newEnemyHp = enemyHp - allyDamageFormula;
    const newAllyHp = allyHp - enemyDamageFormula;

    setEnemyHp(newEnemyHp);
    setAllyHp(newAllyHp);
  }

  if (allyHp > 0 && enemyHp > 0) {
    return (
      <>
        {setTimeout(() => handleAttack(properties.allyPokemon, properties.enemyPokemonStats), 1000)}
        <div>
          <button className="runButton" onClick={properties.handleBackClick}>
            Runaway
          </button>
          <HealthBar allyHp={allyHp} allyHealth={properties.allyPokemon.stats[0].base_stat} enemyHp={enemyHp} enemyHealth={properties.enemyPokemonStats[0].base_stat} />
          <h1 className="allyHp">{allyHp}</h1>
          <h1 className="enemyHp">{enemyHp}</h1>
        </div>
      </>
    );
  } else if (allyHp <= 0) {
    return (
      <>
        <img className="tombstone" src="/src/images/—Pngtree—creative halloween tombstone_1541022.png" />
        <h1 className="lost">
          {properties.allyPokemon.name} was brutally murdered by {properties.enemyPokemonName}
        </h1>
        <button onClick={handleReturnClick} className="return">
          Return
        </button>
      </>
    );
  } else if (enemyHp <= 0) {
    const audio = new Audio('/src/components/audio/zombie-screaming-207590.mp3');
    audio.play();
    return (
      <>
        <img className="pokeball" src="/src/images/m2i8N4N4K9i8N4i8-removebg-preview.png" />
        <h1 className="win">You Caught {properties.enemyPokemonName}</h1>
        <button onClick={handleReturnClick} className="return">
          Return
        </button>
      </>
    );
  } else {
    return null;
  }
}

export default Battle;
