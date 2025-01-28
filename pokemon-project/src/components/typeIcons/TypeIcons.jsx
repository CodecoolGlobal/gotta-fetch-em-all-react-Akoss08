import './typeIcons.css';

function TypeIcons({ image, type, onIconClick }) {
  return <img className="typeIcon" src={image} onClick={() => onIconClick(type)}></img>;
}

export default TypeIcons;
