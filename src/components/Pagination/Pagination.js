import prevPageBtn from '../../assets/images/btn_left.png';
import nextPageBtn from '../../assets/images/btn_right.png';
import './pagination.css';
import { useState, useEffect } from 'react';

function Pagination({ currentPage, setCurrentPage, totalCount }) {
  const [totalPage, setTotalPage] = useState([]);

  useEffect(() => {
    const listPerPage = 10;
    const pages = Math.ceil(totalCount / listPerPage);
    const array = Array.from({ length: pages }, (value, i) => i + 1);
    setTotalPage(array);
  }, [totalCount]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage.length));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (currentPage <= 3) {
      return totalPage.slice(0, 5);
    } else if (currentPage >= totalPage.length - 2) {
      return totalPage.slice(totalPage.length - 5);
    } else {
      return totalPage.slice(currentPage - 3, currentPage + 2);
    }
  };

  return (
    <div className="paginationContainer">
      <img className="prevBtn" src={prevPageBtn} alt="prevBtn" onClick={handlePrevPage} />
      {getPageNumbers().map((page) => (
        <span key={page} className={`pageBtn ${page === currentPage ? 'activeBtn' : ''}`} onClick={() => handlePageClick(page)}>
          {page}
        </span>
      ))}
      <img className="nextBtn" src={nextPageBtn} alt="nextBtn" onClick={handleNextPage} />
    </div>
  );
}

export default Pagination;
