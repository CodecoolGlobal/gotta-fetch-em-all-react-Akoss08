import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Pokedex from './components/Pokedex';
import PokemonEncounter from './components/PokemonEncounter';
import PokedexCard from './components/PokedexCard';

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
