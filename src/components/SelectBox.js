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
    setShow(prevShow => !prevShow);
  };

  const handleOptionButtonClick = (option, order) => {
    handleOptionClick(option);
    setOrder(order);
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
        <button className='base-style' onClick={() => handleOptionButtonClick('최신순', 'latest')}>최신순</button>
        <button className='base-style' onClick={() => handleOptionButtonClick('좋아요순', 'like')}>좋아요순</button>
      </div>}  
    </div>
  );
}

export default SelectBox;