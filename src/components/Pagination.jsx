import useMediaQuery from '../hook/useMediaQuery';
import './Pagination.css';

// 페이지네이션 UI 렌더링
function Pagination({ total, page, setPage }) {
  const tablet = useMediaQuery('(min-width: 787px) and (max-width: 1460px)');
  const mobile = useMediaQuery('(min-width: 375px) and (max-width: 786px)');

  // 화면 크기에 따라 한 번에 보여줄 데이터 배치 크기 설정
  let dataBatch;
  if (tablet) {
    dataBatch = 6;
  } else if (mobile) {
    dataBatch = 4;
  } else {
    dataBatch = 10;
  }

  const maxVisibleButtons = 5; // 화면에 보일 최대 페이지 버튼 수
  const halfVisible = Math.floor(maxVisibleButtons / 2); // 현재 페이지에 해당하는 버튼이 항상 중앙에 위치
  const totalPage = Math.ceil(total / dataBatch); // 총 페이지 수
  const pageNumArr = Array.from({ length: totalPage }, (_, i) => i + 1); // 페이지 번호 배열 생성
  const startPage = Math.max(1, Math.min(page - halfVisible, totalPage - maxVisibleButtons + 1)); // 시작 페이지 계산
  const endPage = Math.min(totalPage, startPage + maxVisibleButtons - 1); // 끝 페이지 계산

  // 이전 페이지로 이동하는 버튼 클릭 핸들러
  const handlePrevClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  // 다음 페이지로 이동하는 버튼 클릭 핸들러
  const handleNextClick = () => {
    setPage((nextPage) => Math.min(nextPage + 1, totalPage));
  };
  // 특정 페이지로 이동하는 버튼 클릭 핸들러
  const handlePageClick = (num) => {
    setPage(num);
  };

  return (
    <div className="Pagination">
      <button className="pagination-prev" onClick={handlePrevClick}>
        {'<'}
      </button>
      {pageNumArr.slice(startPage - 1, endPage).map((num) => {
        return (
          <button
            key={num}
            className={`pagination-num ${page === num ? 'active' : ''}`}
            onClick={() => {
              handlePageClick(num);
            }}
          >
            {num}
          </button>
        );
      })}
      <button className="pagination-next" onClick={handleNextClick}>
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
