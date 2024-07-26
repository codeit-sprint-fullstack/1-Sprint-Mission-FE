import "../assets/styles/Pagination.css";

export function Pagination({ className, pageArray, recentPage, onClick }) {
  const maxButtonNumber = pageArray.length > 5 ? 5 : pageArray.length;
  // console.log("pageArray");
  const leftButtonClass = className + " leftButton";
  const rightButtonClass = className + " rightButton";

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
    <>
      <button className={leftButtonClass} onClick={leftPageButtonClick} />
      {pageArray
        .filter(
          (item) => startIndex < item.index < startIndex + maxButtonNumber
        )
        .map((item) => {
          return (
            <button className={className} onClick={() => onClick(item)}>
              {item}
            </button>
          );
        })}
      <button className={rightButtonClass} onClick={rightPageButtonClick} />
    </>
  );
}

export default Pagination;
