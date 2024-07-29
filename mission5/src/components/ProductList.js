import { useEffect, useState } from 'react';
import './ProductList.css';
import SelectBox from './SelectBox';
import { getProducts } from '../api';

function ProductBest() {
  const page = 1;
  const pageSize = 4;

  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState('favorite');
  
  const handleLoad = async (options) => {
    const { list } = await getProducts(options);
    setItems(list);
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
    </div>
  );
}


function ProductOnSale() {
  const pageSize = 10;
  const page = 1;

  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const sortedItems = items.sort((a, b) => (b[orderBy] - a[orderBy]));

  const handleLoad = async (options) => {
    const { list } = await getProducts(options);
    setItems(list);
  } 

  useEffect(() => {
    handleLoad({page, pageSize, orderBy});
  }, [orderBy]);


  return (
    <div className='OnSaleProduct-container'>
      <div className='OnSaleProduct-nav'>
        <h3 className='OnSaleProduct-title'>판매 중인 상품</h3>
        <div className='OnSaleProduct-search-upload'>
          <input className='OnSaleProduct-search' type='search' placeholder='🔍︎ 검색할 상품을 입력해주세요.'/>
          <button className='OnSaleProduct-upload'>상품 등록하기</button>
        </div>
        <SelectBox setOrderBy={setOrderBy}/>
      </div>
      <div className='OnSaleProduct-items'>
        {sortedItems.map((item) => {
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