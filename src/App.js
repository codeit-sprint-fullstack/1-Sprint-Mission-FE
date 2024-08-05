import './assets/styles/App.css';
import { useEffect, useState, React } from 'react'
import { getProductList } from './services/ProductService.js'
import ProductList from './components/ProductList.js'
import SearchProduct from './components/SearchProduct.js'
import Dropdown from './components/Dropdown.js'
import PagingButton from './components/PagingButton.js'
import { PATH } from './constants/path.js'
import { useMediaQuery } from "react-responsive"

function App() {
  const [bestItem, setBestItem] = useState([]);
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [totalCount, setTotalCount] = useState();
  const [drop, setDrop] = useState(false);

  const Pc = useMediaQuery({
    query : "(min-width:1024px)"
  });

  const Tablet = useMediaQuery({
    query : "(min-width:768px) and (max-width:1023px)"
  });
  
  const Mobile = useMediaQuery({
    query : "(min-width:375px) and (max-width:767px)"
  });

  const bestPagesize = Pc ? PATH.bestProduct : Tablet ? PATH.bestProductTablet : PATH.bestProductMobile
  const sellingPagesize = Pc ? PATH.sellingProduct : Tablet ? PATH.sellingProductTablet : PATH.sellingProductMobile

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
  }
  
  const movePage = (page) => {
    setPage(page);
  }
  
  useEffect(() => {
    const options = { 
      page: 1, 
      pageSize: bestPagesize, 
      orderBy: 'favorite'
    }

    const options2 = { 
      page: page, 
      pageSize: sellingPagesize, 
      orderBy: order,
      keyword: keyword
    }
    
    const bestField = async (options) => {
      const bestLists = await getProductList(options);
      setBestItem(bestLists.list);
    }

    const fetchData = async (options) => {
      const lists = await getProductList(options);
      setItem(lists.list);
      setTotalCount(lists.totalCount);
    }

    bestField(options);
    fetchData(options2);
  }, [order, page, bestPagesize, sellingPagesize, keyword]);
  
  return (
    <div className="App">
      <div className="frame">
        <div className="bestItem">
          <span>베스트 상품</span>
          <ProductList items={bestItem} field={'Best'} />
        </div>
        <div className="sellingItem">
          <div className='sellingItemWrap'>
            <span>판매 중인 상품</span>
            <SearchProduct onSubmit={handleSearch}></SearchProduct>
            <button className='registProduct'></button>
            <ul onClick={() => { setDrop(!drop) }}>
              {Mobile? '' : order === 'recent'? '최신순':'좋아요순'} <span>{" "}</span>
              {drop ? '▲' : '▼'}
              {drop && <Dropdown onClick={handleSort} />}
            </ul>
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
