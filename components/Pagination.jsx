import arrowLeft from "@/public/images/arrow_left.png";
import arrowRight from "@/public/images/arrow_right.png";
import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/pagination.module.css";
import Image from "next/image";

function MidPagingBtn({ num, onChange, pageNum }) {
  const handlePage = (e) => {
    const name = e.target.name;
    onChange(name, num);
  };
  return (
    <button
      name="offset"
      onClick={handlePage}
      className={[styles.mid_btn, pageNum === num ? styles.on_btn : ""].join(
        " "
      )}
    >
      {num}
    </button>
  );
}

function Pagination({ onChange, params, totalCount }) {
  const [pagingNum, setPagingNum] = useState([]);

  //현재의 페이지에서 더 불러올 데이터가 있는지를 판별합니다.
  const moreData = (last) => {
    return totalCount - last * params.limit > 0;
  };

  //상품의 페이징을 5개로 제한 하고 싶은 의도가 있었습니다.
  //예 ) 페이지당 6개 표시하는데 60개가 있다면 페이지 번호가 1~10 이 아닌 1~5
  const makeArrNum = useCallback(() => {
    const num = Math.ceil(totalCount / params.limit);
    let keyboard = Array.from({ length: num }, (v, i) => i + 1);
    if (keyboard.length > 5) {
      keyboard = keyboard.slice(0, 5);
    }
    setPagingNum(keyboard);
  }, [totalCount, params.limit]);

  //페이지의 정보를 변경합니다. 예 ) 현재 2~6 버튼 클릭시 1~5
  const prevBtn = () => {
    const arr = [...pagingNum];
    if (arr[0] === 1) return;
    const newCount = arr[0] - 1;
    arr.pop();
    arr.unshift(newCount);
    setPagingNum(arr);
  };

  //페이지의 정보를 변경합니다. 예 ) 현재 2~6 버튼 클릭시 3~7
  const nextBtn = () => {
    const arr = [...pagingNum];
    if (!moreData(arr.at(-1))) return;
    const newCount = arr.at(-1) + 1;
    arr.shift();
    arr.push(newCount);
    setPagingNum(arr);
  };

  useEffect(() => {
    makeArrNum();
  }, [makeArrNum]);

  return (
    <div className={styles.paging_box}>
      <button className={styles.pre_next_btn} onClick={prevBtn}>
        <Image width={16} height={16} src={arrowLeft} alt="이전 화살표"></Image>
      </button>
      {pagingNum.map((e) => (
        <MidPagingBtn
          pageNum={params.offset}
          onChange={onChange}
          key={e}
          num={e}
        />
      ))}
      <button className={styles.pre_next_btn} onClick={nextBtn}>
        <Image
          width={16}
          height={16}
          src={arrowRight}
          alt="다음 화살표"
        ></Image>
      </button>
    </div>
  );
}

export default Pagination;
