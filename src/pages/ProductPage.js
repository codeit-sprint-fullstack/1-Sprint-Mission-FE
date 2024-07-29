import { useState, useEffect } from 'react';
import Wrapper from '../components/Wrapper';
import { getProducts } from '../services/api';
import { ProductList } from '../components/ProductList';
import searchIcon from '../assets/ic_search.svg';
import './ProductPage.css';
function ProductPage() {
  const [bestProducts, setBestProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  const handleLoad = async (options, setProducts) => {
    try {
      let result;
      result = await getProducts(options);
      if (result) {
        const { list } = result;
        setProducts(list);
      }
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  };

  useEffect(() => {
    handleLoad({ orderBy: 'favorite', pageSize: 4 }, setBestProducts);
    handleLoad({ orderBy: 'recent', pageSize: 10 }, setRecentProducts);
  }, []);

  return (
    <Wrapper className='Wrapper'>
      <h2>베스트 상품</h2>
      <ProductList products={bestProducts} className='best-products' />
      <div className='recent-products-top-bar'>
        <h2>판매중인 상품</h2>
        <div className='search-container'>
          <img src={searchIcon} alt='search icon' className='search-icon' />
          <input placeholder='검색할 상품을 입력해주세요' name='search' />
          <button className='search-button' type='submit'>
            상품 검색하기
          </button>
        </div>
      </div>
      <ProductList products={recentProducts} className='recent-products' />
    </Wrapper>
  );
}

export default ProductPage;
