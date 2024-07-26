import arrowLeft from "../image/arrow_left.png";
import arrowRigth from "../image/arrow_right.png";
import "../css/paging.css";
import { useEffect, useState } from "react";

function MidPagingBtn({ num, onChange, pageNum }) {
  const handlePage = (e) => {
    const name = e.target.name;
    onChange(name, num);
  };
  return (
    <button
      name="page"
      onClick={handlePage}
      id={pageNum === num ? "on_btn" : "mid_btn"}
    >
      {num}
    </button>
  );
}

function Paging({ onChange, pageNum, totalCount, paseSize }) {
  // const defaultNum = [1, 2, 3, 4, 5];
  // const [pagingNum, setPagingNum] = useState(defaultNum);
  const [pagingNum, setPagingNum] = useState([]);

  const moreData = (last) => {
    return totalCount - last * paseSize > 0 ? true : false;
  };

  const prevBtn = () => {
    const arr = [...pagingNum];
    if (arr[0] === 1) return;
    const newcount = arr[0] - 1;
    arr.pop();
    arr.unshift(newcount);
    setPagingNum(arr);
  };

  const nextBtn = () => {
    const arr = [...pagingNum];
    if (!moreData(arr.at(-1))) return;
    const newcount = arr.at(-1) + 1;
    arr.shift();
    arr.push(newcount);
    setPagingNum(arr);
  };

  const makeArrNum = () => {
    const num = Math.ceil(totalCount / paseSize);
    const keyboard = Array.from({ length: num }, (v, i) => i + 1);
    setPagingNum(keyboard);
  };

  useEffect(() => {
    makeArrNum();
  }, [totalCount, paseSize]);

  return (
    <div className="paging_box">
      <button onClick={prevBtn}>
        <img src={arrowLeft} alt="이전 화살표"></img>
      </button>
      {pagingNum.map((e) => (
        <MidPagingBtn pageNum={pageNum} onChange={onChange} key={e} num={e} />
      ))}
      <button onClick={nextBtn}>
        <img src={arrowRigth} alt="이전 화살표"></img>
      </button>
    </div>
  );
}

export default Paging;
