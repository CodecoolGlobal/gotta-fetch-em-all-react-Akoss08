function HealthBar(props) {
  return (
    <>
      <div className="allyHpBar">
        <progress value={props.allyHp} max={props.allyHealth} style={{ accentColor: props.allyColor }} />
      </div>
      <div className="enemyHpBar">
        <progress value={props.enemyHp} max={props.enemyHealth} style={{ accentColor: props.enemyColor }} />
      </div>
    </>
  );
}

export default HealthBar;
