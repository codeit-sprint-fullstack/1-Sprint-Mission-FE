import "../assets/styles/Pagination.css";

export function Pagination({ className, pageArray, recentPage, onClick }) {
  const maxButtonNumber = pageArray.length > 5 ? 5 : pageArray.length;
  // console.log("pageArray");
  const pageButtonClass = className + " Text-lg Semibold";

  const tempIndex = recentPage - Math.floor(maxButtonNumber / 2);
  const startIndex = tempIndex > -1 ? tempIndex : 0;

  let tempPageNum = recentPage - 1;
  const prePageNum = tempPageNum > 0 ? tempPageNum : 1;
  const leftPageButtonClick = () => onClick(prePageNum);
  // const pageButtonClick = () => onClick(targetPage);
  tempPageNum = recentPage + 1;
  const nextPageNum =
    tempPageNum > pageArray.length ? pageArray.length : tempPageNum;
  const rightPageButtonClick = () => onClick(nextPageNum);
  // console.log(pageArray);

  return (
    <div className="flex-row margin-top43 pagination-frame">
      <button className={className} onClick={leftPageButtonClick}>
        <img
          src={require("../assets/images/arrow_left_gray600.svg").default}
          alt="left"
        />
      </button>
      {pageArray
        .filter(
          (item) => startIndex < item.index < startIndex + maxButtonNumber
        )
        .map((item) => {
          let tempClass =
            recentPage === item
              ? pageButtonClass + " recentPage"
              : pageButtonClass;

          return (
            <button className={tempClass} onClick={() => onClick(item)}>
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
