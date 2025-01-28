import { useNavigate } from 'react-router-dom';
import './pokemon.css';

function Pokemon({ pokemon }) {
  const navigate = useNavigate();
  const fallbackImage = '/images/m2i8N4N4K9i8N4i8-removebg-preview.png';
  const spriteUrl =
    pokemon.sprites.front_default || (pokemon.sprites.other['official-artwork'] && pokemon.sprites.other['official-artwork'].front_default) || fallbackImage;

  return <img className="pokemonCharacter" src={spriteUrl} onClick={() => navigate(`/pokedex/${pokemon.name}`, { state: { pokemon } })} />;
}

export default Pokemon;
