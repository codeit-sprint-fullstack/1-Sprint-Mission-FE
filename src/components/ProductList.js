import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent');
  const [productSearch, setProductSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = 5;

  useEffect(() => {
    const updatePageSize = () => {
      const screenType = getScreenType();
      if (screenType === 'desktop') {
        setPageSize(10);
      } else if (screenType === 'tablet') {
        setPageSize(6);
      } else {
        setPageSize(4);
      }
    };

    updatePageSize();
    window.addEventListener('resize', updatePageSize);

    return () => {
      window.removeEventListener('resize', updatePageSize);
    };
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, page, pageSize, productSearch]);

  useEffect(() => {
    fetchBestProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://panda-market-api.vercel.app/products', {
        params: {
          orderBy: sortOrder,
          page,
          pageSize,
          keyword: productSearch,
        },
      });
      setProducts(response.data.list);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchBestProducts = async () => {
    try {
      const response = await axios.get('https://panda-market-api.vercel.app/products', {
        params: {
          orderBy: 'favorite',
        },
      });
      setBestProducts(response.data.list);
    } catch (error) {
      console.error('Error fetching best products:', error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const getScreenType = () => {
    const width = window.innerWidth;
    if (width <= 743) {
      return 'mobile';
    } else if (width <= 1199) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const renderBestProducts = () => {
    const screenType = getScreenType();
    const bestProductsToShow = screenType === 'desktop' ? bestProducts.slice(0, 4) :
                               screenType === 'tablet' ? bestProducts.slice(0, 2) :
                               bestProducts.slice(0, 1);
    return bestProductsToShow.map((product) => (
      <ProductCard key={product.id} product={product} isBestProduct />
    ));
  };

  const renderAllProducts = () => {
    const screenType = getScreenType();
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
            key={i + 1}
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

  const screenType = getScreenType();
  return (
    <div className="product-list">
      <h2 className="section-title">베스트 상품</h2>
      <div className="best-products">
        {renderBestProducts()}
      </div>
      <div className="product-controls-container">
        {screenType !== 'mobile' && <h2 className="section-title">판매 중인 상품</h2>}
        {screenType === 'mobile' && (
          <div className="title-register-row">
            <h2 className="section-title">판매 중인 상품</h2>
            <button className="register-button">상품 등록하기</button>
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
              <button className="register-button">상품 등록하기</button>
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
                  <img src="/image/btn_sort.svg" alt="Sort Icon" onClick={() => document.querySelector('.sort-options').classList.toggle('active')} />
                </div>
              </>
            )}
            <div className="sort-options">
              <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
              </select>
              <img src="/image/down.svg" alt="Dropdown Icon" className="dropdown-icon" />
            </div>
          </div>
        </form>
      </div>
      <div className="all-products">
        {renderAllProducts()}
      </div>
      {renderPagination()}
    </div>
  );
};

export default ProductList;

