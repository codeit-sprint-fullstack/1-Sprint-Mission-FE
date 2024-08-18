import { useEffect, useState } from 'react';
import { getProductLength } from '../api.js';

export function PageButton({ setPageNum }) {
  const [btnNum, setBtnNum] = useState(0);
  const [pageBtn, setPageBtn] = useState(0);
  const [numList, setNumList] = useState([]);
  const [updateBtn, setUpdateBtn] = useState([]);

  const beforeButton = () => {
    if (pageBtn > 0) {
      setPageBtn((num) => num - 1);
    }
  };

  const nextButton = () => {
    if ((pageBtn + 1) * 5 < btnNum) {
      setPageBtn((num) => num + 1);
    }
  };

  const pageNumClick = async (e) => {
    const pageNum = parseInt(e.target.textContent, 10);
    setPageNum(pageNum);
  };

  const getWholeLength = async () => {
    const length = await getProductLength().then((data) => data.length);
    setBtnNum(Math.ceil(length / 10));
  };

  function makeButton() {
    const list = [];
    for (let i = 1; i <= btnNum; i++) {
      list.push(i);
    }
    setNumList(list);
  }

  useEffect(() => {
    /**토탈카운트 + 버튼생성 */
    const getDataAndMakeButtons = async () => {
      await getWholeLength();
      makeButton();
    };
    getDataAndMakeButtons();
  }, [btnNum]);

  useEffect(() => {
    const buttonUpdate = numList.slice(pageBtn * 5, (pageBtn + 1) * 5);
    setUpdateBtn(buttonUpdate);
  }, [numList, pageBtn]);

  return (
    <div className="page-num-box">
      <button className="page-before" onClick={beforeButton}>
        <div className="before-page-btn" />
      </button>
      {updateBtn.map((num) => (
        <button key={`buttonNumber${num}`} onClick={pageNumClick}>
          {num}
        </button>
      ))}
      <button className="page-next" onClick={nextButton}>
        <div className="next-page-btn" />
      </button>
    </div>
  );
}
