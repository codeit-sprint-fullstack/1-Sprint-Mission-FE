import classNames from "classnames";
import "../assets/styles/Pagination.css";

const SHOW_MAX_PAGINATION = 5;

export function Pagination({ className, maxPageNum, currentPage, onClick }) {
  const paginationFrameClass = classNames(
    "flex",
    "flex-row",
    "mt-pagination-mt",
    "h-4rem",
    "items-center",
    "justify-center",
    "gap-0.4rem"
  );
  const btnPageDefaultClass = classNames(
    "w-btn-page",
    "h-btn-page",
    "box-border",
    "shadow-none",
    "border-1",
    "border-gray-200",
    "bg-white",
    "text-gray-500",
    "text-lg",
    "font-semibold"
  );
  const btnCurrentPageClass = classNames(
    "w-btn-page",
    "h-btn-page",
    "box-border",
    "shadow-none",
    "border-1",
    "border-royal-blue",
    "bg-royal-blue",
    "text-white",
    "text-lg",
    "font-semibold"
  );
  const maxButtonNumber =
    maxPageNum > SHOW_MAX_PAGINATION ? SHOW_MAX_PAGINATION : maxPageNum;

  const startPage = () => {
    let tempShowedFirstPage = currentPage - Math.floor(maxButtonNumber / 2);
    const tempShowedLastPage = currentPage + Math.floor(maxButtonNumber / 2);

    tempShowedFirstPage = tempShowedFirstPage > 0 ? tempShowedFirstPage : 1;
    tempShowedFirstPage =
      tempShowedLastPage > maxPageNum
        ? maxPageNum - maxButtonNumber + 1
        : tempShowedFirstPage;
    return tempShowedFirstPage;
  };

  const page = startPage();
  const showPageArray = [];
  for (let i = 0; i < maxButtonNumber; i++) {
    showPageArray.push(page + i);
  }

  let tempPageNum = currentPage - 1;
  const prePageNum = tempPageNum > 0 ? tempPageNum : 1;
  const leftPageButtonClick = () => onClick(prePageNum);

  tempPageNum = currentPage + 1;
  const nextPageNum = tempPageNum > maxPageNum ? maxPageNum : tempPageNum;
  const rightPageButtonClick = () => onClick(nextPageNum);

  function getPaginationClass(pageNum) {
    const pageClass =
      currentPage === pageNum ? btnCurrentPageClass : btnPageDefaultClass;

    return pageClass;
  }

  return (
    <div className={paginationFrameClass}>
      <button className={className} onClick={leftPageButtonClick}>
        <img
          src={require("../assets/images/arrow_left_gray600.svg").default}
          alt="previous page"
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
      <button className={className} onClick={rightPageButtonClick}>
        <img
          src={require("../assets/images/arrow_right_gray600.svg").default}
          alt="next page"
        />
      </button>
    </div>
  );
}

export default Pagination;
