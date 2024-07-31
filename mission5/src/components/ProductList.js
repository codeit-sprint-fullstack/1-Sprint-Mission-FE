import { useEffect, useState } from 'react';
import useProducts from './useProducts';
import useMediaQuery from './useMediaQuery';
import './ProductList.css';
import SelectBox from './SelectBox';


function ProductList() {
  return (
    <div className='ProductList'>
      <ProductBest />
      <ProductOnSale />
    </div>
  );
}


function ProductBest() {
  const page = 1;
  const orderBy = 'favorite';

  const defaultPageSize = 4;
  const [pageSize, setPageSize] = useState(defaultPageSize);
  
  const tablet = useMediaQuery('(min-width: 787px) and (max-width: 1460px)');
  const mobile = useMediaQuery('(min-width: 375px) and (max-width: 786px)');


  useEffect(() => {
    if (tablet) {
      setPageSize(2);
    } else if (mobile) {
      setPageSize(1);
    } else {
      setPageSize(defaultPageSize);
    }
  });
  
  const { items, isLoadingError } = useProducts({ page, pageSize, orderBy }, 'best');

  return (
    <div className='BestProduct-container'>
      <h3 className='BestProduct-title'>베스트 상품</h3>
      <div className='BestProduct-items'>
        {items.map((item) => {
          return (
            <div className='BestProduct-item '>
              <img src={item.images} alt={item.name} />
              <div className='BestProduct-content '>
                <div className='name'>{item.name}</div>
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
  const [order, setOrder] = useState('');
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  
  const defaultPageSize = 10;
  const [pageSize, setPageSize] = useState(defaultPageSize);
  
  const tablet = useMediaQuery('(min-width: 787px) and (max-width: 1460px)');
  const mobile = useMediaQuery('(min-width: 375px) and (max-width: 786px)');

  useEffect(() => {
    if (tablet) {
      setPageSize(6);
    } else if (mobile) {
      setPageSize(4);
    } else {
      setPageSize(defaultPageSize);
    }
  }, [tablet, mobile, defaultPageSize]);

  const {items, isLoadingError, totalCount} = useProducts({page, pageSize, keyword, order}, 'onSale');

  const handleChange = (e) => {
    const searchItem = e.target.value;
    setKeyword(searchItem);
    setPage(1);
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




function Pagination({totalCount, page, setPage}) {
  const tablet = useMediaQuery('(min-width: 787px) and (max-width: 1460px)');
  const mobile = useMediaQuery('(min-width: 375px) and (max-width: 786px)');

  let dataBatch;
  if (tablet) {
    dataBatch = 6;
  } else if (mobile) {
    dataBatch = 4;
  } else {
    dataBatch = 10;
  }

  const maxVisibleButtons = 5;
  const halfVisible = Math.floor(maxVisibleButtons / 2);
  const totalPage = Math.ceil(totalCount / dataBatch);
  const pageNumArr = Array.from({length: totalPage}, (_, i) => i + 1);
  const startPage = Math.max(1, Math.min(page - halfVisible, totalPage - maxVisibleButtons + 1));
  const endPage = Math.min(totalPage, startPage + maxVisibleButtons - 1);

  

  const handlePrevClick = () => {
    setPage((prevPage) => Math.max(prevPage-1, 1))
  }

  const handleNextClick = () => {
    setPage((nextPage) => Math.min(nextPage+1, totalPage))
  }

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