import { useState, useEffect } from 'react';
import HealthBar from './HealthBar';
import { useNavigate } from 'react-router-dom';

function Battle({ allyPokemon, enemyPokemon, setIsCaught, setIsDead, setAllyPokemons }) {
  const navigate = useNavigate();

  const [allyHp, setAllyHp] = useState(allyPokemon.stats[0].base_stat);
  const [enemyHp, setEnemyHp] = useState(enemyPokemon.stats[0].base_stat);

  const [battleOngoing, setBattleOngoing] = useState(true);

  function playAudio(src) {
    const audio = new Audio(src);
    audio.play();
  }

  function calculateDamage(attacker, defender) {
    const attack = attacker.stats[1].base_stat;
    const defense = defender.stats[2].base_stat;
    return Math.round(((2 / 5 + 2) * attack * 120) / (defense * 50) + 2);
  }

  function handleCatch() {
    playAudio('/src/components/audio/cute-level-up-3-189853.mp3');

    setAllyPokemons((prev) => {
      const newPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${enemyPokemon.name}`;
      if (prev.includes(newPokemonUrl)) {
        return prev;
      }

      const updatedPokemons = [...prev, newPokemonUrl];
      localStorage.setItem('allyPokemons', JSON.stringify(updatedPokemons));
      return updatedPokemons;
    });

    setIsCaught(true);
    setBattleOngoing(false);
  }

  function handleAllyDefeat() {
    playAudio('/src/components/audio/videogame-death-sound-43894.mp3');
    setAllyPokemons((prev) => {
      const updatedPokemons = prev.filter((pokemon) => !pokemon.includes(allyPokemon.name));
      localStorage.setItem('allyPokemons', JSON.stringify(updatedPokemons));
      return updatedPokemons;
    });
    setIsDead(true);
    setBattleOngoing(false);
  }

  function handleAttack() {
    playAudio('/src/components/audio/Wood Rattle.mp3');

    const newEnemyHp = enemyHp - calculateDamage(allyPokemon, enemyPokemon);
    setEnemyHp(newEnemyHp);

    if (newEnemyHp <= 0) {
      handleCatch();
      return;
    }

    const newAllyHp = allyHp - calculateDamage(enemyPokemon, allyPokemon);
    setAllyHp(newAllyHp);

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
    const audio = new Audio('/src/components/audio/videogame-death-sound-43894.mp3');
    audio.play();
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
    const audio = new Audio('/src/components/audio/cute-level-up-3-189853.mp3');
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
