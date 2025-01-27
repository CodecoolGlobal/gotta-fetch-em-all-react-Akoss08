function HealthBar({ allyHp, allyHealth, enemyHp, enemyHealth }) {
  return (
    <>
      <div className="allyHpBar">
        <progress value={allyHp} max={allyHealth} />
      </div>
      <div className="enemyHpBar">
        <progress value={enemyHp} max={enemyHealth} />
      </div>
    </>
  );
}

export default HealthBar;
