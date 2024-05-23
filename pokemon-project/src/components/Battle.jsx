import { useState, useEffect } from 'react';
import HealthBar from './HealthBar';

function Battle(props) {
  const [allyHp, setAllyHp] = useState(props.allyPokemon.stats[0].base_stat);
  const [enemyHp, setEnemyHp] = useState(props.enemyPokemonStats[0].base_stat);
  const [allyHealthColor, setAllyHealthColor] = useState('hsl(120, 100%, 14%)');
  const [enemyHealthColor, setEnemyHealthColor] = useState('hsl(120, 100%, 14%)');
  const [isCaught, setIsCaught] = useState(false);

  useEffect(() => {
    if (enemyHp <= 0) {
      props.setUserPokemons((prev) => [...prev, `https://pokeapi.co/api/v2/pokemon/${props.enemyPokemonName}`]);
      setIsCaught(true);
    } else if (allyHp <= 0) {
      props.setUserPokemons((prev) => prev.filter((pokemon) => !pokemon.includes(props.allyPokemon.name)));
    }
  }, [enemyHp]);

  function handleReturnClick() {
    props.setIsLocationClicked(false);
  }

  function getHealthBarColor(newAllyHp, newEnemyHp, currentUserPokemon, enemyPokemonStats) {
    if (newAllyHp < currentUserPokemon.stats[0].base_stat * 0.75) {
      setAllyHealthColor('hsl(35, 100%, 35%)');
      if (newAllyHp < currentUserPokemon.stats[0].base_stat * 0.25) {
        setAllyHealthColor('hsl(0, 100%, 35%)');
      }
    }

    if (newEnemyHp < enemyPokemonStats[0].base_stat * 0.75) {
      setEnemyHealthColor('hsl(35, 100%, 35%)');
      if (newEnemyHp < enemyPokemonStats[0].base_stat * 0.25) {
        setEnemyHealthColor('hsl(0, 100%, 35%)');
      }
    }
  }

  function handleAttack(currentUserPokemon, enemyPokemonStats) {
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

    getHealthBarColor(newAllyHp, newEnemyHp, currentUserPokemon, props.enemyPokemonStats);

    setEnemyHp(newEnemyHp);
    setAllyHp(newAllyHp);
  }

  function handleDead() {
    props.setIsDead(true);
  }

  if (allyHp > 0 && enemyHp > 0) {
    return (
      <div>
        <button className="runButton" onClick={props.handleBackClick}>
          Runaway
        </button>
        <button className="attackButton" onClick={() => handleAttack(props.allyPokemon, props.enemyPokemonStats)}>
          Attack
        </button>
        <HealthBar
          allyHp={allyHp}
          allyHealth={props.allyPokemon.stats[0].base_stat}
          enemyHp={enemyHp}
          enemyHealth={props.enemyPokemonStats[0].base_stat}
          allyColor={allyHealthColor}
          enemyColor={enemyHealthColor}
        />
        <h1 className="allyHp">{allyHp}</h1>
        <h1 className="enemyHp">{enemyHp}</h1>
      </div>
    );
  } else if (allyHp <= 0) {
    return (
      <>
        {handleDead()}
        <img className="tombstone" src="/src/images/—Pngtree—creative halloween tombstone_1541022.png" />
        <h1 className="lost">
          {props.allyPokemon.name} was brutally murdered by {props.enemyPokemonName}
        </h1>
        <button onClick={handleReturnClick} className="return">
          Return
        </button>
      </>
    );
  } else if (isCaught) {
    return (
      <>
        <h1 className="win">You Caught {props.enemyPokemonName}</h1>
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
