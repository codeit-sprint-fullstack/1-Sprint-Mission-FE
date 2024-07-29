import './SelectBox.css';

function SelectBox({select, show, onSelect, onOption}) {
  
  const handleSelectClick = () => {
    onSelect();
  };
  
  const handleOptionClick = (option) => {
    onOption(option)
  };


  return (
    <div className="SelectBox">
      <button onClick={handleSelectClick} className='select-init base-style'>{select}<span>▼</span></button>
      {show && <div className='select-options'>
        <button className='base-style' onClick={() => handleOptionClick('최신순')}>최신순</button>
        <button className='base-style' onClick={() => handleOptionClick('좋아요순')}>좋아요순</button>
      </div>}  
    </div>
  );
}

export default SelectBox;