import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api';

// 특정 유형(베스트, 판매 중인 상품)에 따라 상품 목록을 불러오고, 정렬 및 필터링을 적용
function useProducts({ page = 1, limit = 10, search = '', sort = '' }, type) {
  const [items, setItems] = useState([]);
  const [isLoadingError, setIsLoadingError] = useState('');
  const [total, setTotalCount] = useState(0);

  // 상품 데이터를 불러오는 함수
  // useCallback을 사용하여 함수의 메모이제이션을 통해 불필요한 리렌더링 방지
  const handleLoad = useCallback(
    async (options) => {
      try {
        setIsLoadingError('');
        const result = await getProducts(options);

        // 유형이 '베스트'인 경우
        if (type === 'best') {
          setItems(result.products);
        } else {
          // 유형이 '판매 중인 상품'인 경우
          const { products, total } = result; // 총 몇개의 상품이 등록되어있는 확인하기 위해 total 할당
          setTotalCount(total); // 등록된 상품 개수 설정

          if (options.sort === 'recent') {
            // 최신순으로 정렬
            const sorted = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setItems(sorted);
          } else {
            setItems(products);
          }
        }
      } catch (error) {
        setIsLoadingError(error);
      }
    },
    [type]
  );

  // 컴포넌트가 마운트될 때와 의존성 배열이 변경될 때마다  데이터 불러옴
  useEffect(() => {
    if (type === 'best') {
      handleLoad({ page, limit, sort });
    } else {
      handleLoad({ page, limit, search, sort });
    }
  }, [page, limit, search, sort, handleLoad, type]);

  return { items, isLoadingError, total };
}

export default useProducts;
