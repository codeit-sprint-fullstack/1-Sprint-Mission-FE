import { useEffect, useState } from 'react';
import { getProductItemList } from '../api/ProductItem.js';

import ProductItemList from '../components/ProductItemList.js';
import ProductListHeader from '../components/ProductListHeader.js';
import Pagination from '../components/Pagination.js';

import Container from '../components/Container.js';
import useMediaType from '../hooks/useMediaType.js';

const PAGE_COUNT = 5;

function MarketItemPage() {
  const [orderBy, setOrderBy] = useState('recent');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [pageSizeCount, setPageSizeCount] = useState(10);
  const [total, setTotal] = useState(0);

  const mediaType = useMediaType();

  const handleLoad = async (options) => {
    let result;

    try {
      result = await getProductItemList(options);
      setTotal(() => result.totalCount);
    } catch (error) {
      console.log(error);
      return;
    } finally {
    }

    const list = result.products;

    setItems(list);
    setPageSizeCount(options.pageSize);
  };

  const handleOrderbyChange = (orderBy) => {
    setOrderBy(orderBy);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    if (mediaType === 'mobile') {
      handleLoad({ page, pageSize: 4, orderBy, keyword });
    } else if (mediaType === 'tablet') {
      handleLoad({ page, pageSize: 6, orderBy, keyword });
    } else {
      handleLoad({ page, pageSize: 10, orderBy, keyword });
    }
  }, [page, orderBy, keyword, mediaType]);

  return (
    <>
      <Container>
        <ProductListHeader
          setKeyword={setKeyword}
          handleOrderbyChange={handleOrderbyChange}
          orderBy={orderBy}
        />
        <ProductItemList
          items={items}
          totalItems={total}
          itemCountPerPage={pageSizeCount}
          pageCount={PAGE_COUNT}
        />
        <Pagination
          totalItems={total}
          itemCountPerPage={pageSizeCount}
          pageCount={PAGE_COUNT}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}

export default MarketItemPage;
