import { useState } from 'react';

export const DropDown = ({ text, setText, setOrder }) => {
  const [dropdownView, setDropdownView] = useState('none');
  const clickDropdown = () => {
    setDropdownView(dropdownView === 'none' ? 'block' : 'none');
  };

  const handleRecentClick = () => {
    setOrder('recent');
    setText('최신순');
    setDropdownView('none');
  };

  const handleBestClick = () => {
    setOrder('favorite');
    setText('좋아요순');
    setDropdownView('none');
  };

  return (
    <div className="dropdownContainor">
      <div className="dropdownTextBox" onClick={clickDropdown}>
        {text} <div className="dropArrow" />
      </div>
      <div className="dropdownBox" style={{ display: dropdownView }}>
        <div className="recentBtn" onClick={handleRecentClick}>
          최신순
        </div>
        <div className="favoriteBtn" onClick={handleBestClick}>
          좋아요순
        </div>
      </div>
    </div>
  );
};
