import ProductBestList from '../components/ProductBestList.js';
import ProductList from '../components/ProductList.js';
import Dropdown from '../components/Dropdown.js';
import Pagination from '../components/Pagination.js';

import Container from '../components/Container.js';
import styles from './MarketPage.module.css';

import { useEffect, useState } from 'react';
import { getProductBestList, getProductList } from '../api/ProductService.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const PAGESIZE = 10;
const PAGESIZEBEST = 4;

function MarketPage() {
  const [orderBest, setOrderBest] = useState('favorite');
  const [orderBy, setOrderBy] = useState('recent');
  const [itemsBest, setItemsBest] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  const [total, setTotal] = useState(0);

  const sortedBestItem = itemsBest.sort((a, b) => b[orderBest] - a[orderBest]);
  const sortedListItem = items.sort((a, b) => b[orderBy] - a[orderBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    console.log(e.target.value);
  };

  const handleBestLoad = async (orderBestQuery) => {
    const { list } = await getProductBestList(orderBestQuery);
    setItemsBest(list);
  };

  const handleLoad = async (options) => {
    let result;

    try {
      result = await getProductList(options);
      setTotal(() => result.totalCount);
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
    setTotal(() => result.totalCount);
  };

  useEffect(() => {
    console.log('Total updated:', total);
  }, [total]);

  useEffect(() => {
    handleBestLoad({
      page,
      pageSize: PAGESIZEBEST,
      orderBy: orderBest,
      keyword,
    });
  }, [orderBest]);

  useEffect(() => {
    handleLoad({ page, pageSize: PAGESIZE, orderBy, keyword });
  }, [page, orderBy, keyword]);

  const handleOrderbyChange = (orderBy) => {
    setOrderBy(orderBy);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <Container className={styles.content}>
        <p className={styles.text}>베스트상품</p>
        <ProductBestList className={styles.list} items={sortedBestItem} />
        <div className={styles.productHeader}>
          <p className={styles.text}>판매중인 상품</p>
          <div className={styles.productControls}>
            <FontAwesomeIcon
              className={styles.productControlsIcon}
              icon={faMagnifyingGlass}
            />
            <input
              name='keyword'
              onChange={handleSearchSubmit}
              value={keyword}
              placeholder='검색할 상품을 입력해 주세요'
            />
            <button type='submit'>상품 등록하기</button>
            <Dropdown onOrderChange={handleOrderbyChange} />
          </div>
        </div>
        <ProductList
          items={sortedListItem}
          totalItems={total}
          itemCountPerPage={PAGESIZE}
          pageCount={5}
        />
        <Pagination
          totalItems={total}
          itemCountPerPage={10}
          pageCount={5}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}

export default MarketPage;
