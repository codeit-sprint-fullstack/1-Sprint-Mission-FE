import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange}) {
  const handlePageClick = (pageNum) => {
    onPageChange(pageNum);
  }
  return (
    <div className='page-container'>
      <div className='page'>
      <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Pagination;