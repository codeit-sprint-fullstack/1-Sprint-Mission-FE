import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from './useProducts';
import useMediaQuery from './useMediaQuery';
import SelectBox from './SelectBox';
import Pagination from './Pagination';
import './ProductList.css';

// 베스트 상품과 판매 중인 상품 목록 표시
function ProductList() {
  return (
    <div className="ProductList">
      <ProductOnSale />
    </div>
  );
}

//판매 중인 상품 목록을 렌더링
function ProductOnSale() {
  const [page, setPage] = useState(1); // 페이지 번호 상태
  const [search, setSearch] = useState(''); // 검색 키워드 상태
  const [searchInput, setSearchInput] = useState(''); // 사용자 입력 상태
  const [sort, setSort] = useState(''); // 정렬 입력 상태

  const defaultLimit = 10; // 기본 상품 개수
  const [limit, setLimit] = useState(defaultLimit);

  // 화면 크기에 따른 미디어 쿼리
  const tablet = useMediaQuery('(min-width: 787px) and (max-width: 1460px)');
  const mobile = useMediaQuery('(min-width: 375px) and (max-width: 786px)');

  // 화면 크기에 따라 상품 개수 설정
  useEffect(() => {
    if (tablet) {
      setLimit(6);
    } else if (mobile) {
      setLimit(4);
    } else {
      setLimit(defaultLimit);
    }
  }, [tablet, mobile, defaultLimit]);

  // 제품 목록, 로딩 오류, 총 개수를 가져오는 커스텀 훅 사용
  const { items, isLoadingError, total } = useProducts({ page, limit, search, sort }, 'onSale');

  // 검색 키워드 핸들러
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === '') {
      setSearch(''); // 검색어가 비어 있으면 전체 상품 표시
      setPage(1); // 페이지를 첫 페이지로 초기화
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchInput.trim() !== '') {
      e.preventDefault();
      setSearch(searchInput); // 검색어 설정
      setPage(1); // 검색 시 페이지를 첫 페이지로 초기화
    }
  };

  return (
    <div className="OnSaleProduct-container">
      {!mobile ? (
        <div className="OnSaleProduct-nav">
          <h3 className="OnSaleProduct-title">판매 중인 상품</h3>
          <div className="OnSaleProduct-elements">
            <input
              className="OnSaleProduct-search"
              type="search"
              value={searchInput}
              placeholder="🔍︎ 검색할 상품을 입력해주세요."
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <Link to="/registration">
              <button className="OnSaleProduct-upload">상품 등록하기</button>
            </Link>
            <SelectBox setSort={setSort} mobile={mobile} />
          </div>
        </div>
      ) : (
        <div className="OnSaleProduct-nav">
          <div className="OnSaleProduct-TU">
            <h3 className="OnSaleProduct-title">판매 중인 상품</h3>
            <Link to="/registration">
              <button className="OnSaleProduct-upload">상품 등록하기</button>
            </Link>
          </div>
          <div className="OnSaleProduct-SS">
            <input
              className="OnSaleProduct-search"
              type="search"
              placeholder="🔍︎ 검색할 상품을 입력해주세요."
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <SelectBox setSort={setSort} mobile={mobile} />
          </div>
        </div>
      )}

      <div className="OnSaleProduct-items">
        {items.map((item) => {
          return (
            <div className="OnSaleProduct-item" key={item._id}>
              <img src={item.images} alt={item.name} />
              <div className="OnSaleProduct-content ">
                <div className="name">{item.name}</div>
                <div className="description">{item.description}</div>
                <div className="price">{item.price.toLocaleString()}원</div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination total={total} page={page} setPage={setPage} />
      {isLoadingError?.message && <span>{isLoadingError.message}</span>}
    </div>
  );
}

export default ProductList;
