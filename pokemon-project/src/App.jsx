import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import Pokedex from './pages/pokedex/Pokedex';
import PokemonEncounter from './pages/pokemonEncounter/PokemonEncounter';
import PokedexCard from './pages/pokedexCard/PokedexCard';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/pokedex',
      element: <Pokedex />,
    },
    {
      path: '/:locationName',
      element: <PokemonEncounter />,
    },
    {
      path: '/pokedex/:pokemon',
      element: <PokedexCard />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
