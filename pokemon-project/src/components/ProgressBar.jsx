function ProgressBar(stat) {
  return (
    <div id={`${stat.name}Bar`}>
      <p id="progressBarLabel">{stat.name}</p>
      <progress value={stat.value} max={'200'} />
    </div>
  );
}

export default ProgressBar;
