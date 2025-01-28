<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08">
    <img src="pokemon-project/public/images/mewtwo.jpg" alt="Logo" width="90" height="90">
  </a>

  <h3 align="center">Gotta fetch 'em all</h3>

  <p align="center">
    Travel, explore, and catch Pokémons in React!
    <br />
    <a href="https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08">View Demo</a>
    &middot;
    <a href="https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#main-features">Main Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
    <a href="#usage">Usage</a>
      <ul>
        <li><a href="#example-random-pokémon-encounter">Example</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Battle Scene][battlescene-screenshoot]

Welcome to the Pokémon Battle Game! This is a fun, interactive game where you can travel through various locations, catch wild Pokémons, and battle them using your trusty team of Pokémons. Here’s how the game works:

### Main Features:

- <u><i>Explore Locations:</i></u> On the main page, you’ll find a list of locations. You can easily switch between pages to explore different areas and discover new Pokémon.

- <u><i>Random Enemy Encounters:</u></i> When you click on a location, a random enemy Pokémon from that area will appear, ready for battle.

- <u><i>Battle Mechanics:</u></i> You start with 3 base Pokémon, and you choose which one you want to send into battle against the enemy. The battle is automated based on each Pokémon’s attributes like health, damage, and defense.

- <u><i>Winning or Losing:</u></i> If you win the battle, you catch the enemy Pokémon and it will join your collection for future battles. If you lose, your Pokémon is gone, lost forever. So choose wisely!

- <u><i>Pokéball Feature:</u></i> On the main page, you can click on the Pokéball to view all the Pokémon that exist in the game, not just the ones you’ve caught. Use the search bar to find specific Pokémon by name or explore different types by clicking on the icons (like Fire, Water, etc.). When you click on an icon, it will display all the Pokémon of that type!

The game is easy to pick up, but strategic choices will determine your success. Each battle and encounter is different, keeping the game fresh and exciting.
Pokémon Collection: Who doesn’t love catching Pokémon? Keep battling to build the ultimate team!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This game is built with React and features dynamic page switching, battle mechanics, and a simple but fun Pokémon collection system. Ready to embark on your adventure and become a Pokémon master?

- [![React][React.js]][React-url]
- [![Vite][Vite.js]][Vite-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how to set up the Pokémon Battle Game locally.

### Prerequisites

Before you begin, ensure that you have Node.js and npm installed. If not, you can download and install them from <a href="https://nodejs.org/en/download">nodejs.org</a>.

### Installation

_Follow these simple steps to get the project up and running on your machine._

1. Clone the repo
   ```sh
   git clone https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08.git
   ```
2. Navigate to the project folder
   ```sh
   cd pokemon-project
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm run dev
   ```
5. Open your browser and go to http://localhost:5173/ to play the game!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Once you have the game running, you can explore different locations, encounter wild Pokémon, and engage in automated battles! Here's how you play:

1. **Explore Locations**: On the main page, select different locations to encounter random Pokémon from that area.

![Locations gif][locations-gif]

2. **Battle Pokémon**: Choose one of your three base Pokémon to battle against the enemy Pokémon or run away. The battle is automated, and the outcome depends on their stats like health, damage, and defense.

![battle gif][battle-gif]

3. **Catch Pokémon**: If you win a battle, the enemy Pokémon is caught and added to your collection! If you lose, the selected Pokémon is gone.

![loose gif][loose-gif]

4. **Pokéball**: Click on the Pokéball icon to view all the existing Pokémon.

![pokedex gif][pokedex-gif]

### Example: Random Pokémon Encounter

Here’s a simplified snippet of how a random Pokémon is selected when you visit a new location:

```js
useEffect(() => {
  async function fetchEnemyPokemon() {
    try {
      const locationResponse = await fetch(locationUrl);
      const location = await locationResponse.json();

      if (location.areas.length) {
        const randomAreaIndex = Math.floor(Math.random() * location.areas.length);
        const areaResponse = await fetch(location.areas[randomAreaIndex].url);
        const area = await areaResponse.json();
        const randomPokemonindex = Math.floor(Math.random() * area['pokemon_encounters'].length);

        const pokemonResponse = await fetch(area['pokemon_encounters'][randomPokemonindex].pokemon.url);
        const pokemon = await pokemonResponse.json();

        setEnemyPokemon(pokemon);
      } else {
        setIsEmptyLocation(true);
      }
    } catch (error) {
      console.error(`Error fetching from ${locationUrl}`);
    }
  }

  fetchEnemyPokemon();
}, [locationUrl]);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

This project is currently read-only and not open to external contributions.
However, feel free to fork the repository for personal use or exploration.

Don't forget to give the project a star if you like it! 🌟

### Top contributors:

!NEED TO CHANGE AFTER PUBLIC ON CONTRIB.ROCKS!
<a href="https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08/graphs/contributors">
<img src="https://contrib.rocks/image?repo=MAdem01/el-proyecte-grande-sprint-1" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Akos Horvath - [LinkedIn](https://www.linkedin.com/in/akos-horvath97/) - akos97@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

We’d like to take a moment to thank the resources and tools that helped us bring this Pokémon game to life:

- [Pokémon API](https://pokeapi.co/) – For providing the essential Pokémon data used in this game
- [Vite](https://vite.dev/) – For offering fast and efficient development with minimal setup
- [React](https://react.dev/) – For being the core framework powering the user interface.
- [Shields.io](https://shields.io) – For generating beautiful badges used in the README
- [GitHub Pages](https://pages.github.com) – For hosting and sharing the game with the world

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08.svg?style=for-the-badge
[contributors-url]: https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08.svg?style=for-the-badge
[forks-url]: https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08/network/members
[stars-shield]: https://img.shields.io/github/stars/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08.svg?style=for-the-badge
[stars-url]: https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08/stargazers
[issues-shield]: https://img.shields.io/github/issues/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08.svg?style=for-the-badge
[issues-url]: https://github.com/CodecoolGlobal/gotta-fetch-em-all-react-Akoss08/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/akos-horvath97/
[battlescene-screenshoot]: /pokemon-project/public/images/battlescene.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vite.dev/
[locations-gif]: /pokemon-project/public/gifs/Untitled%20video%20-%20Made%20with%20Clipchamp.gif
[battle-gif]: /pokemon-project/public/gifs/Untitled%20video%20-%20Made%20with%20Clipchamp%20(1).gif
[loose-gif]: /pokemon-project/public/gifs/Untitled%20video%20-%20Made%20with%20Clipchamp%20(2).gif
[pokedex-gif]: /pokemon-project/public/gifs/Untitled%20video%20-%20Made%20with%20Clipchamp%20(3).gif
