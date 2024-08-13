import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getProducts } from '../../services/api';
import SearchBar from '../SearchBar/SearchBar';
import DropDown from '../DropDown/DropDown';
import ProductList from '../ProductList/ProductList';
import Pagination from '../Pagination/Pagination';

import './ProductSection.css';

export default function ProductSection({
  className,
  isTabletSize,
  isMobileSize,
}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const [pageSize, setPageSize] = useState(() => {
    if (isMobileSize) return 4;
    else if (isTabletSize) return 6;
    return 10;
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const init = useCallback(async () => {
    try {
      const result = await getProducts({ orderBy, pageSize, page });

      const { list, totalCount } = result;
      setTotalPages(Math.ceil(totalCount / pageSize));
      setProducts(list);
      setFilteredProducts(list);
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [orderBy, pageSize, page]);

  //서치바 인풋에 타입되는 value가 product.name에 include 되어있는 product을 filter
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
    if (isMobileSize) setPageSize(4);
    else if (isTabletSize) setPageSize(6);
    else setPageSize(10);
  }, [isMobileSize, isTabletSize]);

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
        <Link to='/registration' className='add-product-btn'>
          <button>상품 등록하기</button>
        </Link>
        <DropDown orderBy={orderBy} setOrderBy={setOrderBy} />
      </div>
      <ProductList products={filteredProducts} />
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
      />
    </section>
  );
}
