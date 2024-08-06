import React, { useState, useRef, useEffect } from 'react';
import Arrow from '../../../assets/images/ic_arrow_down.png';
import './dropDown.css';

function DropDown({ setOrderBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [boxText, setBoxText] = useState('최신순');
  const dropDownRef = useRef(null);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickNew = () => {
    setOrderBy('recent');
    setBoxText('최신순');
  };

  const handleClickFavorite = () => {
    setOrderBy('favorite');
    setBoxText('좋아요순');
  };

  return (
    <div className="dropDownContainer" onClick={toggleDropDown} ref={dropDownRef}>
      <div className="dropDown">
        <p className="dropDownText">{boxText}</p>
        <img src={Arrow} alt="Arrow" className={`arrow ${isOpen ? 'rotate' : ''}`} />
      </div>
      {isOpen && (
        <div className="dropDownBox">
          <div className="orderNew" onClick={handleClickNew}>
            최신순
          </div>
          <div className="orderFavorite" onClick={handleClickFavorite}>
            좋아요순
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;
