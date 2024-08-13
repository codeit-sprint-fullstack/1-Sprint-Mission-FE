import './SelectBox.css';
import { useState } from 'react';
import btnImg from '../assets/imgs/ic_sort.png';

function SelectBox({ setSort, mobile }) {
  const [btnName, setBtnName] = useState('---');
  const [show, setShow] = useState(null);

  // 옵션(좋아요, 최신순) 클릭 시 이름 업데이트를 위한 함수
  const handleOptionClick = (option) => {
    setBtnName(option); // 이름 상태 변경
    setShow(false); // 최신순 또는 좋아요 클릭하면 버튼 박스 닫힘
  };

  // show 상태에 따라 버튼 박스 렌더링 결정
  const handleSelectClick = () => {
    setShow((prevShow) => !prevShow);
  };

  const handleOptionButtonClick = (option, sort) => {
    handleOptionClick(option);
    setSort(sort);
  };

  return (
    <div className="SelectBox">
      {!mobile ? (
        <button onClick={handleSelectClick} className="select-init base-style">
          {btnName}
          <span>▼</span>
        </button>
      ) : (
        <button onClick={handleSelectClick} className="select-init base-style">
          <img src={btnImg} width="24" height="24" alt="button-img" />
        </button>
      )}

      {show && (
        <div className="select-options">
          <button className="base-style recent" onClick={() => handleOptionButtonClick('최신순', 'recent')}>
            최신순
          </button>
          <button className="base-style init" onClick={() => handleOptionButtonClick('---', '')}>
            ---
          </button>
        </div>
      )}
    </div>
  );
}

export default SelectBox;
