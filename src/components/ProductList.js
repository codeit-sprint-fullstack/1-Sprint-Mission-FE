import ProductCard from './ProductCard';
import './ProductList.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import searchIcon from '../assets/ic_search.svg';

export default function ProductList({ className }) {
  const [products, setProducts] = useState([]);

  const classNames = `ProductList ${className}`;

  const handleLoad = async (options) => {
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
    handleLoad({ orderBy: 'recent', pageSize: 10 });
  }, []);

  return (
    <>
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
      <ul className={classNames}>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
