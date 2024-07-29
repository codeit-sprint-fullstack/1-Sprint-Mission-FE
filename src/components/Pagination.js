import "../assets/styles/Pagination.css";

const SHOW_MAX_PAGINATION = 5;

export function Pagination({ className, pageArray, recentPage, onClick }) {
  const maxButtonNumber =
    pageArray.length > SHOW_MAX_PAGINATION
      ? SHOW_MAX_PAGINATION
      : pageArray.length;
  const pageButtonClass = className + " Text-lg Semibold";

  const startPage = () => {
    let tempShowedFirstPage = recentPage - Math.floor(maxButtonNumber / 2);
    const tempShowedLastPage = recentPage + Math.floor(maxButtonNumber / 2);

    tempShowedFirstPage = tempShowedFirstPage > 0 ? tempShowedFirstPage : 1;
    tempShowedFirstPage =
      tempShowedLastPage > pageArray.length
        ? pageArray.length - maxButtonNumber + 1
        : tempShowedFirstPage;
    return tempShowedFirstPage;
  };

  const showPageArray = [];
  for (let i = 0; i < maxButtonNumber; i++) {
    showPageArray.push(startPage() + i);
  }

  let tempPageNum = recentPage - 1;
  const prePageNum = tempPageNum > 0 ? tempPageNum : 1;
  const leftPageButtonClick = () => onClick(prePageNum);

  tempPageNum = recentPage + 1;
  const nextPageNum =
    tempPageNum > pageArray.length ? pageArray.length : tempPageNum;
  const rightPageButtonClick = () => onClick(nextPageNum);

  return (
    <div className="flex-row margin-top43 pagination-frame">
      <button className={className} onClick={leftPageButtonClick}>
        <img
          src={require("../assets/images/arrow_left_gray600.svg").default}
          alt="left"
        />
      </button>
      {showPageArray.map((item) => {
        let tempClass =
          recentPage === item
            ? pageButtonClass + " recentPage"
            : pageButtonClass;

        return (
          <button
            key={item}
            className={tempClass}
            onClick={() => onClick(item)}
          >
            {item}
          </button>
        );
      })}
      <button className={className} onClick={rightPageButtonClick}>
        <img
          src={require("../assets/images/arrow_right_gray600.svg").default}
          alt="right"
        />
      </button>
    </div>
  );
}

export default Pagination;
