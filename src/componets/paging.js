import arrowLeft from "../image/arrow_left.png";
import arrowRigth from "../image/arrow_right.png";
import "../css/paging.css";
import { useState } from "react";

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

function Paging({ onChange, pageNum }) {
  const defaultNum = [1, 2, 3, 4, 5];
  const [pagingNum, setPagingNum] = useState(defaultNum);

  return (
    <div className="paging_box">
      <button>
        <img src={arrowLeft}></img>
      </button>
      {pagingNum.map((e) => (
        <MidPagingBtn pageNum={pageNum} onChange={onChange} key={e} num={e} />
      ))}
      <button>
        <img src={arrowRigth}></img>
      </button>
    </div>
  );
}

export default Paging;
