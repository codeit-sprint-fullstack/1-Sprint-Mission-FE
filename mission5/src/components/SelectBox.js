import './SelectBox.css';
import { useState } from 'react';

function SelectBox({setOrder}) {
  const [btnName, setBtnName] = useState('-');
  const [show, setShow] = useState(null);

  const handleOptionClick = (option) => {
    setBtnName(option);
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
        <button className='base-style' onClick={() => {handleOptionClick('최신순'); setOrder('latest');}}>최신순</button>
        <button className='base-style' onClick={() => {handleOptionClick('좋아요순'); setOrder('like');}}>좋아요순</button>
        <button className='base-style' onClick={() => {handleOptionClick(''); setOrder('');}}>--</button>
      </div>}  
    </div>
  );
}

export default SelectBox;