import TypeIcons from '../typeIcons/TypeIcons';
import './typeFilter.css';

function TypeFilter({ onIconClick, typeList }) {
  return (
    <div className="typeIcons">
      {typeList.map((type, index) => (
        <TypeIcons key={index} image={type.url} type={type.name} onIconClick={onIconClick} />
      ))}
    </div>
  );
}

export default TypeFilter;
