import { useState } from 'react';
import './DropDown.css';

import arrowIcon from '../assets/ic_arrow_down.svg';

export default function DropDown({ setOrderBy, sortOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSorting = (order) => {
    setOrderBy(order);
    setIsOpen(false);
  };

  return (
    <div className='DropDown'>
      <button onClick={toggleDropDown}>
        {sortOrder === 'recent' ? '최신순' : '인기순'}
        <img src={arrowIcon} alt='arrow icon' className='arrow-icon' />
      </button>
      {isOpen && (
        <ul>
          <li onClick={() => handleSorting('recent')}>최신순</li>
          <li onClick={() => handleSorting('favorite')}>인기순</li>
        </ul>
      )}
    </div>
  );
}
