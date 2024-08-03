import { useState } from 'react';

export const DropDown = ({ text, setText, setOrder, setPageNum }) => {
  const [dropdownView, setDropdownView] = useState('none');
  const clickDropdown = () => {
    setDropdownView(dropdownView === 'none' ? 'block' : 'none');
  };

  const handleRecentClick = () => {
    setOrder('recent');
    setText('최신순');
    setDropdownView('none');
    setPageNum(1);
  };

  const handleBestClick = () => {
    setOrder('favorite');
    setText('좋아요순');
    setDropdownView('none');
    setPageNum(1);
  };

  return (
    <div className="drop-down-containor">
      <div className="drop-down-text-box" onClick={clickDropdown}>
        {text} <div className="drop-arrow" />
      </div>
      <div className="drop-down-box" style={{ display: dropdownView }}>
        <div className="recent-btn" onClick={handleRecentClick}>
          최신순
        </div>
        <div className="favorite-btn" onClick={handleBestClick}>
          좋아요순
        </div>
      </div>
    </div>
  );
};
