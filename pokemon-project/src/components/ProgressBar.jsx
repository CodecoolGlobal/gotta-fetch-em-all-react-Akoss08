function ProgressBar(stat) {
  console.log(stat.value);

  return (
    <div className="progress">
      <p id="progressBar">{stat.name}</p>
      <progress value={stat.value} max={'150'} />
    </div>
  );
}

export default ProgressBar;
