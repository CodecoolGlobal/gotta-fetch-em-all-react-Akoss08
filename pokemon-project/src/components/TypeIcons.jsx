function TypeIcons(props) {
  return (
    <img
      className="typeIcon"
      src={props.image}
      onClick={() => props.handleClick(props.type)}
    ></img>
  );
}

export default TypeIcons;
