import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const screenType = useScreenType();

  useEffect(() => {
    if (screenType === 'desktop') {
      setPageSize(10);
    } else if (screenType === 'tablet') {
      setPageSize(6);
    } else {
      setPageSize(4);
    }
  }, [screenType]);

  const { products, bestProducts } = useFetchProducts(sortOrder, page, pageSize, productSearch);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const renderBestProducts = () => {
    const bestProductsToShow =
      screenType === 'desktop'
        ? bestProducts.slice(0, 4)
        : screenType === 'tablet'
        ? bestProducts.slice(0, 2)
        : bestProducts.slice(0, 1);

    return bestProductsToShow.map((product) => (
      <ProductCard key={product.id} product={product} isBestProduct />
    ));
  };

  const renderAllProducts = () => {
    let allProductsToShow;
    if (screenType === 'desktop') {
      allProductsToShow = products.slice(0, 10);
    } else if (screenType === 'tablet') {
      allProductsToShow = products.slice(0, 6);
    } else {
      allProductsToShow = products.slice(0, 4);
    }
    return allProductsToShow.map((product) => (
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
      <h2 className="section-title">베스트 상품</h2>
      <div className="best-products">{renderBestProducts()}</div>
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
                <option value="favorite">좋아요순</option>
              </select>
              <img src="/image/down.svg" alt="Dropdown Icon" className="dropdown-icon" />
            </div>
          </div>
        </form>
      </div>
      <div className="all-products">{renderAllProducts()}</div>
      {renderPagination()}
    </div>
  );
};

export default ProductList;

