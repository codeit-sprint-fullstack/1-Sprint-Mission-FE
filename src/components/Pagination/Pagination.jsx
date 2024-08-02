import './Pagination.css';
import arrowIcon from '../../assets/arrow_right.svg';

export default function Pagination({ totalPages, setPage, currentPage }) {
  const pageRange = 5;

  //totalPages의 5단위로 버튼 5개 보여주도록.
  //현재 페이지가 (totalPage/ 5)의 어느 몇번째에 속하는지 startPage, endPage 정함.
  const currentGroup = Math.ceil(currentPage / pageRange);
  const startPage = (currentGroup - 1) * pageRange + 1;
  const endPage = Math.min(startPage + pageRange - 1, totalPages);

  let pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  //현재 페이지에서 5단위로  - 이동
  const handlePrevFiveClick = () => {
    setPage((page) => {
      if (page <= pageRange) return 1;
      return page - pageRange;
    });
  };

  //현재 페이지에서 5단위로  + 이동
  const handleNextFiveClick = () => {
    setPage((page) => {
      if (totalPages - page < pageRange) return Math.max(page, totalPages);
      return page + pageRange;
    });
  };

  return (
    <ul className='Pagination'>
      <li>
        <button
          className='arrow-left'
          onClick={handlePrevFiveClick}
          disabled={currentPage <= 1}
        >
          <img src={arrowIcon} alt='left arrow Icon' />
        </button>
      </li>
      {pageNumbers.map((number) => {
        const isActive = number === currentPage;
        return (
          <li key={number}>
            <button
              className={isActive ? 'current' : ''}
              onClick={() => handlePageClick(number)}
            >
              {number}
            </button>
          </li>
        );
      })}
      <li>
        <button
          className='arrow-right'
          onClick={handleNextFiveClick}
          disabled={currentPage >= totalPages}
        >
          <img src={arrowIcon} alt='right arrow Icon' />
        </button>
      </li>
    </ul>
  );
}
