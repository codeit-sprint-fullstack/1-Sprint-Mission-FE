import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/api';
import SearchBar from './SearchBar';
import DropDown from './DropDown';
import ProductList from './ProductList';
import './ProductSection.css';

export default function ProductSection({ className, tabletSize, mobileSize }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const [pageSize, setPageSize] = useState(() => {
    if (mobileSize) return 4;
    else if (tabletSize) return 6;
    return 10;
  });

  const init = useCallback(async () => {
    try {
      const result = await getProducts({ orderBy, pageSize });

      const { list } = result;
      setProducts(list);
      setFilteredProducts(list);
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [orderBy, pageSize]);

  const handleSearchChange = (e) => {
    const searchInputValue = e.target.value;
    setSearchValue(searchInputValue);
    if (searchInputValue === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        return product.name.includes(searchInputValue);
      });
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    if (mobileSize) setPageSize(4);
    else if (tabletSize) setPageSize(6);
    else setPageSize(10);
  }, [mobileSize, tabletSize]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <section className={className}>
      <div className='top-bar'>
        <h2>판매중인 상품</h2>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChange={handleSearchChange}
        />
        <button className='add-product-btn'>상품 등록하기</button>
        <DropDown orderBy={orderBy} setOrderBy={setOrderBy} />
      </div>
      <ProductList products={filteredProducts} />
    </section>
  );
}
