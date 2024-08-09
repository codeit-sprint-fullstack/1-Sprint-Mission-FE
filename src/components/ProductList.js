import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductList.css';
import useScreenType from '../hooks/useScreenType';
import useFetchProducts from '../hooks/useFetchProducts';

const ProductList = () => {
  const [sortOrder, setSortOrder] = useState('recent');
  const [productSearch, setProductSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = 5;
  const navigate = useNavigate();
  const location = useLocation();
  const isMarketPage = location.pathname === '/items'; // 중고마켓 페이지 여부 확인

  const screenType = useScreenType();

  useEffect(() => {
    if (screenType === 'desktop') {
      setPageSize(10); // 데스크탑: 10개
    } else if (screenType === 'tablet') {
      setPageSize(6); // 태블릿: 6개
    } else {
      setPageSize(4); // 모바일: 4개
    }
  }, [screenType]);

  // useFetchProducts 훅에서 isMarketPage 값을 전달해 중고마켓 페이지 여부를 판단
  const { products, bestProducts } = useFetchProducts(sortOrder, page, pageSize, productSearch, isMarketPage);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const renderAllProducts = () => {
    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <div className="pagination-item" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          <img src="/image/left.svg" alt="Previous" />
        </div>
        {[...Array(totalPages)].map((_, i) => (
          <div
            key={`pagination-item-${i}`}
            className={`pagination-item ${page === i + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </div>
        ))}
        <div className="pagination-item" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          <img src="/image/right.svg" alt="Next" />
        </div>
      </div>
    );
  };

  return (
    <div className="product-list">
      {isMarketPage ? (
        <>
          <div className="product-controls-container">
            {screenType === 'mobile' && (
              <div className="title-register-row">
                <button className="register-button" onClick={() => navigate('/registration')}>상품 등록하기</button>
              </div>
            )}
            <form onSubmit={handleSearchSubmit} className="product-controls">
              {screenType !== 'mobile' && (
                <>
                  <div className="search-bar">
                    <img src="/image/glass.svg" alt="Search Icon" className="search-icon" />
                    <input
                      type="text"
                      placeholder="검색할 상품을 입력해주세요"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                    />
                  </div>
                  <button className="register-button" type="button" onClick={() => navigate('/registration')}>상품 등록하기</button>
                </>
              )}
              <div className={`search-sort-row ${screenType === 'mobile' ? 'mobile-row' : ''}`}>
                {screenType === 'mobile' && (
                  <>
                    <div className="search-bar">
                      <img src="/image/glass.svg" alt="Search Icon" className="search-icon" />
                      <input
                        type="text"
                        placeholder="검색할 상품을 입력해주세요"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                      />
                    </div>
                    <div className="btn-sort">
                      <img
                        src="/image/btn_sort.svg"
                        alt="Sort Icon"
                        onClick={() => document.querySelector('.sort-options').classList.toggle('active')}
                      />
                    </div>
                  </>
                )}
                <div className="sort-options">
                  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="recent">최신순</option>
                  </select>
                  <img src="/image/down.svg" alt="Dropdown Icon" className="dropdown-icon" />
                </div>
              </div>
            </form>
          </div>
          <div className="all-products">{renderAllProducts()}</div> {/* 중고마켓 상품 목록 렌더링 */}
        </>
      ) : (
        <>
          <h2 className="section-title">베스트 상품</h2>
          <div className="best-products">
            {bestProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} isBestProduct />
            ))}
          </div>
          <div className="product-controls-container">
            {screenType !== 'mobile' && <h2 className="section-title">판매 중인 상품</h2>}
            {screenType === 'mobile' && (
              <div className="title-register-row">
                <h2 className="section-title">판매 중인 상품</h2>
                <button className="register-button" onClick={() => navigate('/registration')}>상품 등록하기</button>
              </div>
            )}
            <form onSubmit={handleSearchSubmit} className="product-controls">
              {screenType !== 'mobile' && (
                <>
                  <div className="search-bar">
                    <img src="/image/glass.svg" alt="Search Icon" className="search-icon" />
                    <input
                      type="text"
                      placeholder="검색할 상품을 입력해주세요"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                    />
                  </div>
                  <button className="register-button" type="button" onClick={() => navigate('/registration')}>상품 등록하기</button>
                </>
              )}
              <div className={`search-sort-row ${screenType === 'mobile' ? 'mobile-row' : ''}`}>
                {screenType === 'mobile' && (
                  <>
                    <div className="search-bar">
                      <img src="/image/glass.svg" alt="Search Icon" className="search-icon" />
                      <input
                        type="text"
                        placeholder="검색할 상품을 입력해주세요"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                      />
                    </div>
                    <div className="btn-sort">
                      <img
                        src="/image/btn_sort.svg"
                        alt="Sort Icon"
                        onClick={() => document.querySelector('.sort-options').classList.toggle('active')}
                      />
                    </div>
                  </>
                )}
                <div className="sort-options">
                  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="recent">최신순</option>
                  </select>
                  <img src="/image/down.svg" alt="Dropdown Icon" className="dropdown-icon" />
                </div>
              </div>
            </form>
          </div>
          <div className="all-products">{renderAllProducts()}</div> {/* 초기 렌더링 상품 목록 렌더링 */}
        </>
      )}
      {renderPagination()} {/* 페이지네이션 렌더링 */}
    </div>
  );
};

export default ProductList;


