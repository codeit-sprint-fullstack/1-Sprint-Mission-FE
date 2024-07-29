import { useState } from 'react';
import './ProductList.css';
import SelectBox from './SelectBox';

function ProductBest({item, setOrderBy, setPageSize}) {
  const ORDER = 'favorite';
  const LIMIT = 4;
  setOrderBy(ORDER);
  setPageSize(LIMIT);
  return (
    <div className='BestProduct-item '>
      <img src={item.images} alt={item.name} />
      <div className='BestProduct-content '>
        <div className='description'>{item.description}</div>
        <div className='price'>{(item.price).toLocaleString()}원</div>
        <div className='favoriteCount'><span> ♡ </span>{item.favoriteCount}</div>
      </div>
    </div>
  );
}

function ProductList({items, setOrderBy, setPageSize}) {
  const [select, setSelect] = useState('최신순');
  const [show, setShow] = useState(null);

  const handleOption = (option) => {
    setSelect(option);
    setShow(false);
  }

  const handleSelect = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  return (
    <div className='ProductList'>
     
        <div className='BestProduct-container'>
          <h3 className='BestProduct-title'>베스트 상품</h3>
          <div className='BestProduct-items'>
            {items.map((item) => {
                return (
                  <ProductBest 
                  key={item.id} 
                  item={item} 
                  setOrderBy={setOrderBy} 
                  setPageSize={setPageSize}/>
                );
              })}
          </div>
        </div>

        <div className='OnSaleProduct-container'>
          <div className='OnSaleProduct-nav'>
            <h3 className='OnSaleProduct-title'>판매 중인 상품</h3>
            <div className='OnSaleProduct-search-upload'>
              <input className='OnSaleProduct-search' type='search' placeholder='🔍︎ 검색할 상품을 입력해주세요.'/>
              <button className='OnSaleProduct-upload'>상품 등록하기</button>
            </div>
            <SelectBox select={select} show={show} onSelect={handleSelect} onOption={handleOption}/>
          </div>
          <div className=''></div>  
        </div>

    </div>
  );
}

export default ProductList;