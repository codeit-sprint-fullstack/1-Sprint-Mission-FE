import { useState, useEffect, useCallback } from 'react';
import { getProductList } from '../api/api';
import { LIMIT } from '../constants';

function useProductList(order, initialCursor) {
  const [products, setProducts] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [cursor, setCursor] = useState(initialCursor);

  const fetchProducts = useCallback(async () => {
    try {
      setLoadingError(null);
      const response = await getProductList({ order, cursor, limit: LIMIT });
      const { paging, list, totalCount } = response;

      // 응답 데이터의 구조 확인
      console.log('받아온 객체:',response);
      console.log('list:', response.list);
      console.log('paging:', response.paging);
      console.log('totalCount:', response.totalCount);

      if (Array.isArray(response)) {
        setProducts(response); // 전체 상품 목록 설정
        setCursor(paging ? paging.nextCursor : null);
        setHasNext(paging ? paging.hasNext : false);
        setTotalPages(totalCount ? Math.ceil(totalCount / LIMIT) : 5);
      } else {
        throw new Error('상품 목록 데이터가 유효하지 않습니다.');
      }
    } catch (error) {
      setLoadingError(error.message);
    }
  }, [order, cursor]);

  useEffect(() => {
    fetchProducts(1); // 초기 로드
  }, [order, cursor, fetchProducts]);

  return { products, hasNext, loadingError, totalPages, fetchProducts };
}

export default useProductList;
