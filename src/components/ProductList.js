import ProductCard from './ProductCard';
import './ProductList.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import SearchBar from './SearchBar';
import DropDown from './DropDown';

export default function ProductList({ className }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent');

  const classNames = `ProductList ${className}`;

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
    <>
      <div className='top-bar'>
        <h2>판매중인 상품</h2>
        <SearchBar
          search={search}
          setSearch={setSearch}
          onClick={handleSearch}
        />

        <DropDown setSortOrder={setSortOrder} sortOrder={sortOrder} />
      </div>
      <ul className={classNames}>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
