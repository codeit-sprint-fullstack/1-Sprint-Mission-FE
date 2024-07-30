import { useEffect, useState } from 'react';
import './ProductList.css';
import SelectBox from './SelectBox';
import { getProducts } from '../api';

function Pagination() {
  return (
    <div className='Pagination'>
      <button className='pagination-prev'></button>
      <button className='pagination-next'></button>
    </div>
  );
}

function ProductBest() {
  const page = 1;
  const pageSize = 4;
  const orderBy = 'favorite';

  const [items, setItems] = useState([]);
  const [isLoadingError, setIsLoadingError] = useState(null);
  
  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoadingError(null);
      result = await getProducts(options);
      const { list } = result;
      setItems(list);
    } catch (error) {
      setIsLoadingError(error);
      return null;
    }
  } 

  useEffect(() => {
    handleLoad({page, pageSize, orderBy});
  }, [orderBy]);

  return (
    <div className='BestProduct-container'>
      <h3 className='BestProduct-title'>베스트 상품</h3>
      <div className='BestProduct-items'>
        {items.map((item) => {
            return (
              <div className='BestProduct-item '>
                <img src={item.images} alt={item.name} />
                <div className='BestProduct-content '>
                  <div className='title'>{item.name}</div>
                  <div className='price'>{(item.price).toLocaleString()}원</div>
                  <div className='favoriteCount'><span> ♡ </span>{item.favoriteCount}</div>
                </div>
              </div>
            );
          })}
      </div>
      {isLoadingError?.message && <span>{isLoadingError.message}</span>}
    </div>
  );
}


function ProductOnSale() {
  const page = 1;
  const pageSize = 10;
  
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isLoadingError, setIsLoadingError] = useState(null);

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoadingError(null);
      result = await getProducts(options);
      const { list } = result;
      if (order === 'like') {
        const sorted = [...list].sort((a, b) => b.favoriteCount - a.favoriteCount);
        setItems(sorted);
      } else if (order === 'latest') {
        const sorted = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItems(sorted);
      } else {
        setItems(list);
      }
      
    } catch (error) {
      setIsLoadingError(error);
      return;
    }
  }

  const handleChange = (e) => {
    const searchItem = e.target.value;
    setKeyword(searchItem);
  }

  useEffect(() => {
    handleLoad({page, pageSize, keyword});
  }, [order, keyword]);


  return (
    <div className='OnSaleProduct-container'>
      <div className='OnSaleProduct-nav'>
        <h3 className='OnSaleProduct-title'>판매 중인 상품</h3>
        <div className='OnSaleProduct-search-upload'>
          <input 
            className='OnSaleProduct-search' 
            type='search' 
            placeholder='🔍︎ 검색할 상품을 입력해주세요.' 
            onChange={handleChange}
          />
          <button className='OnSaleProduct-upload'>상품 등록하기</button>
        </div>
        <SelectBox setOrder={setOrder}/>
      </div>
      
      <div className='OnSaleProduct-items'>
        {items.map((item) => {
          return (
            <div className='OnSaleProduct-item '>
              <img src={item.images} alt={item.name} />
              <div className='OnSaleProduct-content '>
                <div className='title'>{item.name}</div>
                <div className='price'>{(item.price).toLocaleString()}원</div>
                <div className='favoriteCount'><span> ♡ </span>{item.favoriteCount}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {isLoadingError?.message && <span>{isLoadingError.message}</span>}
    </div>
  );
}


function ProductList() {
  return (
    <div className='ProductList'>
      <ProductBest />
      <ProductOnSale />

    </div>
  );
}

export default ProductList;