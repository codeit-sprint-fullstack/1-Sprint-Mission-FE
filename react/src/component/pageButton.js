import { useEffect, useState } from 'react';
import { getProductLength } from '../api.js';

export function PageButton({ setPageNum }) {
  const [btnNum, setBtnNum] = useState(0);

  const pageNumClick = async (e) => {
    const pageNum = parseInt(e.target.textContent, 10);
    setPageNum(pageNum);
  };

  const getWholeLength = async () => {
    const length = await getProductLength().then((data) => data.totalCount);
    setBtnNum(Math.ceil(length / 10));
  };

  useEffect(() => {
    getWholeLength();
  }, []);

  function makeButton() {
    const numList = [];
    for (let i = 1; i <= btnNum; i++) {
      numList.push(i);
    }
    return numList;
  }

  return (
    <div className="pageNumBox">
      <button className="pageBefore">{'<'}</button>
      {makeButton(btnNum).map((num) => (
        <button key={`buttonNumber${num}`} onClick={pageNumClick}>
          {num}
        </button>
      ))}
      <button className="pageNext">{'>'}</button>
    </div>
  );
}
