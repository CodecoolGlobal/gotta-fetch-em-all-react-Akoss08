import { useState } from 'react';

function PokemonModel({ sprite, isLost, baseClass, lostBattleClass }) {
  const [isVisible, setIsVisible] = useState(true);

  const className = isLost ? `${baseClass} ${lostBattleClass}` : `${baseClass}`;

  if (!isVisible) return null;

  return (
    <>
      <img src={sprite} className={className} onAnimationEnd={() => setIsVisible(false)}></img>
    </>
  );
}

export default PokemonModel;
