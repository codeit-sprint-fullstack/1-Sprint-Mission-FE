import { useEffect, useState } from 'react';
import { getProducts } from '../api';
import Nav from './Nav';
import ProductList from './ProductList';

function App() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const handleLoad = async (options) => {
    const {list} = await getProducts(options);
    setItems(list);
  } 

  console.log(items);

  useEffect(() => {
    handleLoad({page, pageSize, orderBy});
  }, [orderBy]);

  return (
    <div className='App'>
      <Nav/>
      <ProductList 
        items={items} 
        setOrderBy={setOrderBy} 
        setPageSize={setPageSize}
      />
    </div>
  );
}

export default App;