function ProgressBar({ name, value }) {
  return (
    <div id={`${name}Bar`}>
      <p className="progressBarLabel">{name}</p>
      <progress value={value} max={'200'} />
    </div>
  );
}

export default ProgressBar;
