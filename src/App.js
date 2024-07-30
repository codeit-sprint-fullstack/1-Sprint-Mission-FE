import ProductBestList from './product/ProductBest.js';
import ProductList from './product/ProductList.js';
import { getProductBestList, getProductList } from './api/ProductService.js';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
// import { Shift } from './Pagination.js';

import navLogo from './img/nav_logo.png';
import navLoginIcon from './img/nav_login_icon.png';

import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const PAGESIZE = 10;

function App() {
  const [orderBest, setOrderBest] = useState('favorite');
  const [orderBy, setOrderBy] = useState('recent');
  const [itemsBest, setItemsBest] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  const [total, setTotal] = useState(0);

  const [hasNext, setHasNext] = useState(false);

  const click = () => {
    setHasNext(true) ? setHasNext(false) : setHasNext(true);
  };

  const sortedBestItem = itemsBest.sort((a, b) => b[orderBest] - a[orderBest]);
  const sortedListItem = items.sort((a, b) => b[orderBy] - a[orderBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    console.log(e.target.value);
  };

  const handleSortChange = (orderBy) => {
    setOrderBy(orderBy);
    setHasNext(false);
  };

  const handleBestLoad = async (orderBestQuery) => {
    const { list } = await getProductBestList(orderBestQuery);
    setItemsBest(list);
  };

  const handleLoad = async (options) => {
    console.log(options);
    let result;
    try {
      result = await getProductList(options);
      setTotal(result.totalCount);
      console.log(total);
    } catch (error) {
      console.log(error);
      return;
    } finally {
    }

    const { list } = result;
    if (options.page === 1) {
      setItems(list);
    } else {
      setItems([...list]);
    }

    setPage(options.page + 1);
    console.log(page);
    console.log(result.totalCount);
    setTotal(result.totalCount);
    console.log(total);
  };

  const handleLoadMore = () => {
    handleLoad({ page, pageSize: PAGESIZE, orderBy, keyword });
  };

  useEffect(() => {
    handleBestLoad(orderBest);
  }, [orderBest]);

  useEffect(() => {
    handleLoad({ page: 1, pageSize: PAGESIZE, orderBy, keyword });
  }, [orderBy, keyword]);

  return (
    <>
      <header className='header'>
        <div className='duv'>
          <img className='logo' src={navLogo} alt='판다마켓로고' />

          <p className='first'>자유게시판</p>
          <BrowserRouter>
            <Link className='link' to='/'>
              <p>중고마켓</p>
            </Link>
          </BrowserRouter>
        </div>
        <img className='login' src={navLoginIcon} alt='판다마켓로고' />
      </header>

      <ProductBestList items={sortedBestItem} />
      <div className='form2'>
        <form className='form'>
          <h1>판매 중인 상품</h1>
          <div className='form_div'>
            <FontAwesomeIcon className='input_icon' icon={faMagnifyingGlass} />
            <input
              name='keyword'
              onChange={handleSearchSubmit}
              value={keyword}
              placeholder='검색할 상품을 입력해 주세요'
            />
            <button type='submit'>상품 등록하기</button>
            <div onClick={click}>
              <div>최신순</div>
              <FontAwesomeIcon
                className='input_icon'
                icon={faCaretDown}
                onClick={click}
              />
              {hasNext && (
                <div>
                  <div onClick={() => handleSortChange('recent')} id='recent'>
                    최신순
                  </div>
                  <div
                    onClick={() => handleSortChange('favorite')}
                    value='favorite'
                  >
                    좋아요순
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
        <ProductList items={sortedListItem} />
        <button className='more' onClick={handleLoadMore}>
          더보기
        </button>
        {/* <Shift /> */}
      </div>
    </>
  );
}

export default App;
