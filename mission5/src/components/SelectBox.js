import './SelectBox.css';
import { useState } from 'react';

function SelectBox({setOrderBy}) {
  const [btnName, setbtnName] = useState('최신순');
  const [show, setShow] = useState(null);

  const handleOptionClick = (option) => {
    setbtnName(option);
    setShow(false);
  };

  const handleSelectClick = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <div className="SelectBox">
      <button onClick={handleSelectClick} className='select-init base-style'>{btnName}<span>▼</span></button>
      {show && <div className='select-options'>
        <button className='base-style' onClick={() => {handleOptionClick('최신순'); setOrderBy('recent');}}>최신순</button>
        <button className='base-style' onClick={() => {handleOptionClick('좋아요순'); setOrderBy('favorite');}}>좋아요순</button>
      </div>}  
    </div>
  );
}

export default SelectBox;