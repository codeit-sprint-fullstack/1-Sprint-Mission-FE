import "../assets/styles/Pagination.css";

const SHOW_MAX_PAGINATION = 5;

export function Pagination({ className, maxPageNum, recentPage, onClick }) {
  console.log("Pagination : " + maxPageNum);
  const maxButtonNumber =
    maxPageNum > SHOW_MAX_PAGINATION ? SHOW_MAX_PAGINATION : maxPageNum;
  const pageButtonClass = className + " Text-lg Semibold";

  const startPage = () => {
    let tempShowedFirstPage = recentPage - Math.floor(maxButtonNumber / 2);
    const tempShowedLastPage = recentPage + Math.floor(maxButtonNumber / 2);

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

  let tempPageNum = recentPage - 1;
  const prePageNum = tempPageNum > 0 ? tempPageNum : 1;
  const leftPageButtonClick = () => onClick(prePageNum);

  tempPageNum = recentPage + 1;
  const nextPageNum = tempPageNum > maxPageNum ? maxPageNum : tempPageNum;
  const rightPageButtonClick = () => onClick(nextPageNum);

  function getPaginationClass(pageNum) {
    const pageClass =
      recentPage === pageNum
        ? pageButtonClass + " recentPage"
        : pageButtonClass;

    return pageClass;
  }

  return (
    <div className="flex-row margin-top43 pagination-frame">
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
