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
      className={["mid_btn", pageNum === num ? "on_btn" : ""].join(" ")}
    >
      {num}
    </button>
  );
}

function Paging({ onChange, params, totalCount }) {
  const [pagingNum, setPagingNum] = useState([]);

  //현재의 페이지에서 더 불러올 데이터가 있는지를 판별합니다.
  const moreData = (last) => {
    return totalCount - last * params.paseSize > 0;
  };

  //상품의 페이징을 5개로 제한 하고 싶은 의도가 있었습니다.
  //예 ) 페이지당 6개 표시하는데 60개가 있다면 페이지 번호가 1~10 이 아닌 1~5
  const makeArrNum = () => {
    const num = Math.ceil(totalCount / params.pageSize);
    let keyboard = Array.from({ length: num }, (v, i) => i + 1);
    if (keyboard.length > 5) {
      keyboard = keyboard.slice(0, 5);
    }
    setPagingNum(keyboard);
  };

  //페이지의 정보를 변경합니다. 예 ) 현재 2~6 버튼 클릭시 1~5
  const prevBtn = () => {
    const arr = [...pagingNum];
    if (arr[0] === 1) return;
    const newcount = arr[0] - 1;
    arr.pop();
    arr.unshift(newcount);
    setPagingNum(arr);
  };

  //페이지의 정보를 변경합니다. 예 ) 현재 2~6 버튼 클릭시 3~7
  const nextBtn = () => {
    const arr = [...pagingNum];
    if (!moreData(arr.at(-1))) return;
    const newcount = arr.at(-1) + 1;
    arr.shift();
    arr.push(newcount);
    setPagingNum(arr);
  };

  useEffect(() => {
    makeArrNum();
  }, [params.pageSize, totalCount]);

  return (
    <div className="paging_box">
      <button className="pre_next_btn" onClick={prevBtn}>
        <img src={arrowLeft} alt="이전 화살표"></img>
      </button>
      {pagingNum.map((e) => (
        <MidPagingBtn
          pageNum={params.page}
          onChange={onChange}
          key={e}
          num={e}
        />
      ))}
      <button className="pre_next_btn" onClick={nextBtn}>
        <img src={arrowRigth} alt="다음 화살표"></img>
      </button>
    </div>
  );
}

export default Paging;
