import './assets/styles/App.css';
import { useEffect, useState } from 'react'
import { getProductList } from './services/ProductService.js'
import ProductList from './components/ProductList.js'
import SearchProduct from './components/SearchProduct.js'
import Dropdown from './components/Dropdown.js'
import { PagingButton } from './components/PagingButton.js'

function App() {
  const BESTPAGE = 4;
  const SELLINGPAGE = 10;
  const BESTFIELDS = 'favorite';

  const [bestItem, setBestItem] = useState([]);
  const [item, setItem] = useState([]);
  const [order, setOrder] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [drop, setDrop] = useState(false);
  const [state, setState] = useState('최신순');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();

  const handleSearch = (value) => {
    setKeyword(value);
  }

  const handleSort = (text) => {
    if (text === '최신순') {
      setOrder('recent');
      setPage(1);
    }
    else {
      setOrder('favorite');
      setPage(1);
    }
    setState(text);
  }
  
  const movePage = (page) => {
    setPage(page);
  }

  useEffect(() => {
    const options = { 
      page: page, 
      pageSize: SELLINGPAGE, 
      orderBy: order,
      keyword: keyword
    }

    const bestField = async (options) => {
      const bestLists = (await getProductList(options));
      setBestItem(bestLists.list);
    }

    const fetchData = async (options) => {
      const lists = (await getProductList(options));
      setItem(lists.list);
      setTotalCount(lists.totalCount);
    }

    bestField({ page: 1, pageSize: BESTPAGE, orderBy: BESTFIELDS });
    fetchData(options);
  }, [order, page, keyword]);

  return (
    <div className="App">
      <div className="frame">
        <div className="bestItem">
          <span>베스트 상품</span>
          <ProductList items={bestItem} field={'Best'} />
        </div>
        <div className="sellingItem">
          <div className='sellingItemWrap'>
            <span>판매중인 상품</span>
            <div className='aboutItem'>
              <SearchProduct onSubmit={handleSearch}></SearchProduct>
              <button className='registProduct'></button>
              <ul onClick={() => { setDrop(!drop) }}>
                {state} <span>{" "}</span>
                {drop ? '▲' : '▼'}
                {drop && <Dropdown onClick={handleSort} />}
              </ul>
            </div>
          </div>
          <ProductList items={item} field='Selling' />
        </div>
      </div>
      <div className="paging">
        <PagingButton count={totalCount} page={page} onClick={movePage}></PagingButton>
      </div>
    </div>
  );
}

export default App;
