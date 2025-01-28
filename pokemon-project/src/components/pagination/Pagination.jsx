import { useNavigate } from 'react-router-dom';
import './pagination.css';

function Pagination({ offset, onNextClick, onPreviousClick, isLastPage }) {
  const navigate = useNavigate();

  return (
    <div className="pokedexButtonContainer">
      <button className="pokedexButton" onClick={onPreviousClick} disabled={offset < 1}>
        Previous page
      </button>
      <button className="pokedexButton" onClick={() => navigate('/')}>
        Home
      </button>
      <button className="pokedexButton" onClick={onNextClick} disabled={isLastPage()}>
        Next page
      </button>
    </div>
  );
}

export default Pagination;
