import ProgressBar from './ProgressBar';

function PokedexCard(pokemonData) {
  console.log(pokemonData);
  return (
    <>
      <div id="pokedex">
        <div id="left-panel">
          <div className="left-top-container">
            <svg height="100" width="225" className="left-svg"></svg>
            <div className="lights-container">
              <div className="big-light-boarder">
                <div className="big-light blue">
                  <div className="big-dot light-blue"></div>
                </div>
              </div>
              <div className="small-lights-container">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="small-light yellow">
                  <div className="dot light-yellow"></div>
                </div>
                <div className="small-light green">
                  <div className="dot light-green"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="screen-container">
            <div className="screen">
              <div className="top-screen-lights">
                <div className="mini-light red"></div>
                <div className="mini-light red"></div>
              </div>
              <img id="main-screen" src={pokemonData.data.sprites.other['official-artwork']['front_default']}></img>
              <div className="bottom-screen-lights">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="burger">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons-container">
            <div className="nav-buttons-container">
              <div className="green-screen">
                <span id="name-screen">{pokemonData.data.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div id="right-panel">
          <button id="pokedexBackButton" className="pokedexButton" onClick={() => pokemonData.handleBackClick(null)}>
            X
          </button>
          <div className="empty-container"></div>
          <div id="about-screen" className="right-panel-screen">
            Height: {pokemonData.data.height * 10}cm Weight: {pokemonData.data.weight}kg
          </div>
          <div id="stat-screen">
            {pokemonData.data.stats.map((stat, index) => (
              <ProgressBar key={index} value={stat['base_stat']} name={stat.stat.name}></ProgressBar>
            ))}
          </div>
          <div className="bottom-screens-container">
            <div id="type-screen" className="right-panel-screen">
              {pokemonData.data.types[0].type.name}
            </div>
            <div id="id-screen" className="right-panel-screen">
              {pokemonData.data.id}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokedexCard;
