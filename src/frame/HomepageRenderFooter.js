import React from "react";
import "./HomepageRenderFooter.css";

function HomepageRenderFooter({ nowPage, handlePageChange, totalPageSize }) {
  const showPageSize = 5;

  const startNum = Math.floor((nowPage - 1) / showPageSize) * showPageSize + 1;
  const endNum = Math.min(startNum - 1 + showPageSize, totalPageSize);

  const pageNumSelect = (e) => {
    handlePageChange(Number(e.target.textContent));
  }

  const renderPageNumbers = () => {
    const pageNumGroup = [];
    for (let i = startNum; i <= endNum; i++) {
      pageNumGroup.push(
        <button
          key={i}
          className={nowPage === i ? "activeBtn" : "pageNumBtn"}
          onClick={pageNumSelect}
        >
          {i}
        </button>
      );
    }
    return pageNumGroup;
  };

  const renderPreviousPage = () => {
    return (
      <button
        className={nowPage === 1 ? "btnNonDisplay" : "pageMoveBtn"}
        onClick={() => {
          handlePageChange(nowPage - 1);
        }}
      >
        &lt;
      </button>
    );
  };

  const renderNextPage = () => {
    return (
      <button
        className={nowPage === totalPageSize ? "btnNonDisplay" : "pageMoveBtn"}
        onClick={() => {
          handlePageChange(nowPage + 1);
        }}
      >
        &gt;
      </button>
    );
  };

  return (
    <footer className="footerContain">
      {renderPreviousPage()}
      {renderPageNumbers()}
      {renderNextPage()}
    </footer>
  );
}

export default HomepageRenderFooter;
