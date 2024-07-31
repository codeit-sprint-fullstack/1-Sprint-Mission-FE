import './SelectBox.css';
import { useState } from 'react';
import btnImg from '../assets/imgs/ic_sort.png';

function SelectBox({setOrder, mobile}) {
  const [btnName, setBtnName] = useState('최신순');
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
      {(!mobile) ? 
      <button 
        onClick={handleSelectClick} 
        className='select-init base-style'>
          {btnName}<span>▼</span>
      </button>
      :
      <button 
        onClick={handleSelectClick} 
        className='select-init base-style'>
          <img src={btnImg} width='24' height='24' alt='button-img'/>
      </button>
      } 
      
      {show && <div className='select-options'>
        <button className='base-style' onClick={() => {handleOptionClick('최신순'); setOrder('latest');}}>최신순</button>
        <button className='base-style' onClick={() => {handleOptionClick('좋아요순'); setOrder('like');}}>좋아요순</button>
      </div>}  
    </div>
  );
}

export default SelectBox;