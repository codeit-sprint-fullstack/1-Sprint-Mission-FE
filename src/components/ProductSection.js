import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import SearchBar from './SearchBar';
import DropDown from './DropDown';
import ProductList from './ProductList';

export default function ProductSection({ className }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent');

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
    handleLoad({ orderBy: sortOrder, pageSize: 10 });
  }, [sortOrder]);

  return (
    <section>
      <div className='top-bar'>
        <h2>판매중인 상품</h2>
        <SearchBar
          search={search}
          setSearch={setSearch}
          onClick={handleSearch}
        />
        <DropDown setSortOrder={setSortOrder} sortOrder={sortOrder} />
      </div>
      <ProductList products={products} className={className} />
    </section>
  );
}
