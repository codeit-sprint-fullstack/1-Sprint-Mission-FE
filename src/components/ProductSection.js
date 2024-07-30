import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import SearchBar from './SearchBar';
import DropDown from './DropDown';
import ProductList from './ProductList';

export default function ProductSection({ className, tabletSize, mobileSize }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const [orderBy, setOrderBy] = useState('recent');
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    if (mobileSize) {
      setPageSize(4);
    } else if (tabletSize) {
      setPageSize(6);
    } else {
      setPageSize(10);
    }
  }, [mobileSize, tabletSize]);

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

  const handleSearch = () => {
    handleLoad({ keyword: search });
  };

  useEffect(() => {
    handleLoad({ orderBy, pageSize });
  }, [orderBy, pageSize]);

  return (
    <section>
      <div className='top-bar'>
        <h2>판매중인 상품</h2>
        <SearchBar
          search={search}
          setSearch={setSearch}
          onClick={handleSearch}
        />
        <DropDown orderBy={orderBy} setOrderBy={setOrderBy} />
      </div>
      <ProductList products={products} className={className} />
    </section>
  );
}
