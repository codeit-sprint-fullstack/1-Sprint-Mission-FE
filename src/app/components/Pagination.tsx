import Image from "next/image";
import classNames from "classnames";

const SHOW_MAX_PAGINATION = 5;

interface PaginationProps {
  maxPageNum: number;
  currentPage: number;
  onClick: Function;
}

export function Pagination({
  maxPageNum,
  currentPage,
  onClick,
}: PaginationProps) {
  const paginationFrameClass = classNames(
    "flex",
    "flex-row",
    "mt-[4.3rem]",
    "h-4rem",
    "items-center",
    "justify-center",
    "gap-0.4rem"
  );
  const btnPageCommonClass = classNames(
    "w-btn-page",
    "h-btn-page",
    "box-border",
    "shadow-none",
    "rounded-full",
    "border-1",
    "text-lg",
    "font-semibold"
  );
  const btnPageDefaultClass = classNames(
    btnPageCommonClass,
    "border-gray-200",
    "bg-white",
    "text-gray-500"
  );
  const btnCurrentPageClass = classNames(
    btnPageCommonClass,
    "border-royal-blue",
    "bg-royal-blue",
    "text-white"
  );
  const btnMovePageClass = classNames(
    btnPageCommonClass,
    "flex",
    "items-center",
    "justify-center"
  );
  const maxButtonNumber =
    maxPageNum > SHOW_MAX_PAGINATION ? SHOW_MAX_PAGINATION : maxPageNum;

  const startPage = () => {
    let tempShowedFirstPage = currentPage - Math.floor(maxButtonNumber / 2);
    const tempShowedLastPage = currentPage + Math.floor(maxButtonNumber / 2);

    tempShowedFirstPage =
      tempShowedLastPage > maxPageNum
        ? maxPageNum - maxButtonNumber + 1
        : tempShowedFirstPage;
    tempShowedFirstPage = tempShowedFirstPage > 0 ? tempShowedFirstPage : 1;
    return tempShowedFirstPage;
  };

  const page = startPage();
  const showPageArray = [];
  for (let i = 0; i < maxButtonNumber; i++) {
    showPageArray.push(page + i);
  }
  console.log("page : ", page);
  console.log("maxButtonNumber : ", maxButtonNumber);
  console.log("showPageArray : ", showPageArray);

  let tempPageNum = currentPage - 1;
  const prePageNum = tempPageNum > 0 ? tempPageNum : 1;
  const leftPageButtonClick = () => onClick(prePageNum);

  tempPageNum = currentPage + 1;
  const nextPageNum = tempPageNum > maxPageNum ? maxPageNum : tempPageNum;
  const rightPageButtonClick = () => onClick(nextPageNum);

  function getPaginationClass(pageNum: number) {
    const pageClass =
      currentPage === pageNum ? btnCurrentPageClass : btnPageDefaultClass;

    return pageClass;
  }

  // 임시로 Image에 width/height px 단위로 박아 넣음. 수정 예정
  return (
    <div className={paginationFrameClass}>
      <button className={btnMovePageClass} onClick={leftPageButtonClick}>
        <Image
          src={"/icons/arrow_left_gray600.svg"}
          alt="previous page"
          width={16}
          height={16}
        />
      </button>
      {showPageArray.map((item) => {
        return (
          <button
            key={item}
            className={getPaginationClass(item)}
            onClick={() => onClick(item)}
          >
            {item}
          </button>
        );
      })}
      <button className={btnMovePageClass} onClick={rightPageButtonClick}>
        <Image
          src={"/icons/arrow_right_gray600.svg"}
          alt="next page"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}

export default Pagination;
