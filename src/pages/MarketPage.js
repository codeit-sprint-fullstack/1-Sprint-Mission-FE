import { useEffect, useState, useCallback } from 'react';
import { getProductBestList, getProductList } from '../api/ProductService.js';

import { debounce } from 'lodash';

import ProductBestList from '../components/ProductBestList.js';
import ProductList from '../components/ProductList.js';
import Dropdown from '../components/Dropdown.js';
import Pagination from '../components/Pagination.js';

import Container from '../components/Container.js';
import styles from './MarketPage.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const PAGECOUNT = 5;

function MarketPage() {
  const [orderBy, setOrderBy] = useState('recent');
  const [itemsBest, setItemsBest] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [mediaType, setMediaType] = useState();
  const [pageSizeCount, setPageSizeCount] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchKeyword, SetSearchKeyword] = useState('');

  const sortedListItem = items.sort((a, b) => b[orderBy] - a[orderBy]);

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
    setPageSizeCount(options.pageSize);
  };

  const handleOrderbyChange = (orderBy) => {
    setOrderBy(orderBy);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const performSearch = useCallback(
    debounce(async (searchTerm) => {
      setKeyword(searchTerm);
    }, 900),
    []
  );

  const handleInputChange = (event) => {
    const newKeyword = event.target.value;
    SetSearchKeyword(newKeyword);
    performSearch(newKeyword);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.outerWidth;

      if (773 >= width) {
        setMediaType('mobile');
      } else if (1200 >= width) {
        setMediaType('tablet');
      } else {
        setMediaType('pc');
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (mediaType === 'mobile') {
      handleLoad({ page, pageSize: 4, orderBy, keyword });
    } else if (mediaType === 'tablet') {
      handleLoad({ page, pageSize: 6, orderBy, keyword });
    } else {
      handleLoad({ page, pageSize: 10, orderBy, keyword });
    }
  }, [page, orderBy, keyword, mediaType]);

  useEffect(() => {
    if (mediaType === 'mobile') {
      handleBestLoad({ page, pageSize: 1, orderBy: 'favorite', keyword });
    } else if (mediaType === 'tablet') {
      handleBestLoad({ page, pageSize: 2, orderBy: 'favorite', keyword });
    } else {
      handleBestLoad({ page, pageSize: 4, orderBy: 'favorite', keyword });
    }
  }, [mediaType]);

  return (
    <>
      <Container className={styles.content}>
        <p className={styles.text}>베스트상품</p>
        <ProductBestList className={styles.list} items={itemsBest} />
        <div className={styles.productHeader}>
          <p className={styles.text}>판매중인 상품</p>
          <div className={styles.productControls}>
            <FontAwesomeIcon
              className={styles.productControlsIcon}
              icon={faMagnifyingGlass}
            />
            <input
              name='search'
              type='text'
              onChange={handleInputChange}
              value={searchKeyword}
              placeholder='검색할 상품을 입력해 주세요'
            />
            <button className={styles.productControlsButton} type='submit'>
              상품 등록하기
            </button>
            <Dropdown onOrderChange={handleOrderbyChange} />
          </div>
        </div>
        <ProductList
          items={sortedListItem}
          totalItems={total}
          itemCountPerPage={pageSizeCount}
          pageCount={PAGECOUNT}
        />
        <Pagination
          totalItems={total}
          itemCountPerPage={pageSizeCount}
          pageCount={PAGECOUNT}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}

export default MarketPage;
