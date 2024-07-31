import { useState } from 'react';
import './DropDown.css';

import arrowIcon from '../assets/ic_arrow_down.svg';
import sortIcon from '../assets/ic_sort.svg';
import useMediaQuery from '../hooks/useMediaQuery';

export default function DropDown({ setOrderBy, orderBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileSize = useMediaQuery('mobileSize');

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
        {mobileSize ? (
          <img src={sortIcon} alt='sort icon' />
        ) : orderBy === 'recent' ? (
          '최신순'
        ) : (
          '인기순'
        )}

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
