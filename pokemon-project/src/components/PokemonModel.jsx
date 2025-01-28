import { useState } from 'react';

function PokemonModel({ sprite, isLost, baseClass, lostBattleClass }) {
  const className = isLost ? `${baseClass} ${lostBattleClass}` : `${baseClass}`;

  return (
    <>
      <img src={sprite} className={className}></img>
    </>
  );
}

export default PokemonModel;
