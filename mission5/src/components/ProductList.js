import { useEffect, useState } from 'react';
import './ProductList.css';
import SelectBox from './SelectBox';
import { getProducts } from '../api';


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
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('');
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [isLoadingError, setIsLoadingError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const pageSize = 10;

  console.log(page);

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoadingError(null);
      result = await getProducts(options);
      const { list, totalCount } = result;
      setTotalCount(totalCount)
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
  }, [order, keyword, page]);


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
      <Pagination totalCount={totalCount} page={page} setPage={setPage}/>
      {isLoadingError?.message && <span>{isLoadingError.message}</span>}
    </div>
  );
}




function Pagination({totalCount, page, setPage}) {
  const maxVisibleButtons = 5;
  const halfVisible = Math.floor(maxVisibleButtons / 2);
  const prev = '<';
  const next = '>';
  
  const totalPage = Math.ceil(totalCount / 10);
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
      <button className='pagination-prev' onClick={handlePrevClick}>{prev}</button>
      {pageNumArr.slice(startPage - 1, endPage).map((num) => {
        return (
          <button key={num} 
          className={`pagination-num ${page === num ? 'active': ''}`} 
          onClick={() => {handlePageClick(num)}}>{num}</button>
        );
      })}
      <button className='pagination-next' onClick={handleNextClick}>{next}</button>
    </div>
  );
}



export default ProductList;