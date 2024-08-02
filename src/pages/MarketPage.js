import { useEffect, useState, useCallback } from 'react';
import { getProductBestList, getProductList } from '../api/ProductService.js';

import { debounce } from 'lodash';

import ProductBestList from '../components/ProductBestList.js';
import ProductList from '../components/ProductList.js';
import ProductListHeader from '../components/ProductListHeader.js';
import Pagination from '../components/Pagination.js';

import Container from '../components/Container.js';

import useMediaType from '../hook/useMediaType.js';

import useMediaType from '../hook/useWindow.js';

const PAGECOUNT = 5;

function MarketPage() {
  const [orderBy, setOrderBy] = useState('recent');
  const [itemsBest, setItemsBest] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [pageSizeCount, setPageSizeCount] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchKeyword, SetSearchKeyword] = useState('');

  const mediaType = useMediaType();

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

    setItems(list);
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
      handleBestLoad({ page: 1, pageSize: 1, orderBy: 'favorite' });
    } else if (mediaType === 'tablet') {
      handleBestLoad({ page: 1, pageSize: 2, orderBy: 'favorite' });
    } else {
      handleBestLoad({ page: 1, pageSize: 4, orderBy: 'favorite' });
    }
  }, [mediaType]);

  return (
    <>
      <Container>
        <ProductBestList items={itemsBest} />
        <ProductListHeader
          performSearch={performSearch}
          handleOrderbyChange={handleOrderbyChange}
          orderBy={orderBy}
        />
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
