import { useEffect, useState } from 'react';
import useProducts from './useProducts';
import useMediaQuery from './useMediaQuery';
import './ProductList.css';
import SelectBox from './SelectBox';

// 베스트 상품과 판매 중인 상품 목록 표시
function ProductList() {
  return (
    <div className='ProductList'>
      <ProductOnSale />
    </div>
  );
}


//판매 중인 상품 목록을 렌더링
function ProductOnSale() {
  const [order, setOrder] = useState(''); // 좋아요, 최신순 정렬 순서 상태
  const [page, setPage] = useState(1); // 페이지 번호 상태
  const [keyword, setKeyword] = useState(''); // 검색 키워드 상태
  
  const defaultPageSize = 10; // 기본 상품 개수
  const [pageSize, setPageSize] = useState(defaultPageSize);
  
  // 화면 크기에 따른 미디어 쿼리 
  const tablet = useMediaQuery('(min-width: 787px) and (max-width: 1460px)');
  const mobile = useMediaQuery('(min-width: 375px) and (max-width: 786px)');

  // 화면 크기에 따라 상품 개수 설정
  useEffect(() => {
    if (tablet) {
      setPageSize(6);
    } else if (mobile) {
      setPageSize(4);
    } else {
      setPageSize(defaultPageSize);
    }
  }, [tablet, mobile, defaultPageSize]);

  // 제품 목록, 로딩 오류, 총 개수를 가져오는 커스텀 훅 사용
  const {items, isLoadingError, totalCount} = useProducts({page, pageSize, keyword, order}, 'onSale');

  // 검색 키워드 핸들러
  const handleChange = (e) => {
    const searchItem = e.target.value;
    setKeyword(searchItem); // 검색어 설정
    setPage(1); // 페이지 초기화
  }


  return (
    <div className='OnSaleProduct-container'>
      {(!mobile) ? 
      <div className='OnSaleProduct-nav'>
        <h3 className='OnSaleProduct-title'>판매 중인 상품</h3>
        <div className='OnSaleProduct-elements'>
          <input 
            className='OnSaleProduct-search' 
            type='search' 
            placeholder='🔍︎ 검색할 상품을 입력해주세요.' 
            onChange={handleChange}
          />
          <button className='OnSaleProduct-upload'>상품 등록하기</button>
          <SelectBox setOrder={setOrder} mobile={mobile}/>
        </div>
      </div>
      :
      <div className='OnSaleProduct-nav'>
        <div className='OnSaleProduct-TU'>
          <h3 className='OnSaleProduct-title'>판매 중인 상품</h3>
          <button className='OnSaleProduct-upload'>상품 등록하기</button>
        </div>
        <div className='OnSaleProduct-SS'>
          <input 
            className='OnSaleProduct-search' 
            type='search' 
            placeholder='🔍︎ 검색할 상품을 입력해주세요.' 
            onChange={handleChange}
          />
          <SelectBox setOrder={setOrder} mobile={mobile}/>
        </div>
      </div>
      }
      
      <div className='OnSaleProduct-items'>
        {items.map((item) => {
          return (
            <div className='OnSaleProduct-item '>
              <img src={item.images} alt={item.name} />
              <div className='OnSaleProduct-content '>
                <div className='name'>{item.name}</div>
                <div className='price'>{(item.price).toLocaleString()}원</div>
                <div className='favoriteCount'><span> ♡ </span>{item.favoriteCount}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination totalCount={totalCount} page={page} setPage={setPage}/>
      {isLoadingError?.message && <span>{isLoadingError.message}</span>}
    </div>
  );
}



// 페이지네이션 UI 렌더링
function Pagination({totalCount, page, setPage}) {
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
  const totalPage = Math.ceil(totalCount / dataBatch); // 총 페이지 수
  const pageNumArr = Array.from({length: totalPage}, (_, i) => i + 1); // 페이지 번호 배열 생성
  const startPage = Math.max(1, Math.min(page - halfVisible, totalPage - maxVisibleButtons + 1)); // 시작 페이지 계산
  const endPage = Math.min(totalPage, startPage + maxVisibleButtons - 1); // 끝 페이지 계산

  
  // 이전 페이지로 이동하는 버튼 클릭 핸들러
  const handlePrevClick = () => {
    setPage((prevPage) => Math.max(prevPage-1, 1))
  }
  // 다음 페이지로 이동하는 버튼 클릭 핸들러
  const handleNextClick = () => {
    setPage((nextPage) => Math.min(nextPage+1, totalPage))
  }
  // 특정 페이지로 이동하는 버튼 클릭 핸들러
  const handlePageClick = (num) => {
    setPage(num);
  };
  

  return (
    <div className='Pagination'>
      <button className='pagination-prev' onClick={handlePrevClick}>{'<'}</button>
      {pageNumArr.slice(startPage - 1, endPage).map((num) => {
        return (
          <button key={num} 
          className={`pagination-num ${page === num ? 'active': ''}`} 
          onClick={() => {handlePageClick(num)}}>{num}</button>
        );
      })}
      <button className='pagination-next' onClick={handleNextClick}>{'>'}</button>
    </div>
  );
}



export default ProductList;