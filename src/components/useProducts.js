import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../api";

// 특정 유형(베스트, 판매 중인 상품)에 따라 상품 목록을 불러오고, 정렬 및 필터링을 적용
function useProducts({ page=1, pageSize=10, keyword='', orderBy='', order='' }, type) {
  const [items, setItems] = useState([]);
  const [isLoadingError, setIsLoadingError] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  // 상품 데이터를 불러오는 함수
  // useCallback을 사용하여 함수의 메모이제이션을 통해 불필요한 리렌더링 방지
  const handleLoad = useCallback(async (options) => {
    try {
      setIsLoadingError('');
      const result = await getProducts(options);

      // 유형이 '베스트'인 경우
      if (type === 'best') {
        setItems(result.list);
      } else { // 유형이 '판매 중인 상품'인 경우
        const { list, totalCount } = result; // 총 몇개의 상품이 등록되어있는 확인하기 위해 totalCount 할당
        setTotalCount(totalCount); // 등록된 상품 개수 설정

        if (options.order === 'like') {
          // 좋아요 순으로 정렬
          const sorted = [...list].sort((a, b) => b.favoriteCount - a.favoriteCount);
          setItems(sorted);
        } else if (options.order === 'latest') {
          // 최신순으로 정렬
          const sorted = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setItems(sorted);
        } else {
          setItems(list);
        }
      }
    } catch (error) {
      setIsLoadingError(error);
    }
  }, [type]);

  // 컴포넌트가 마운트될 때와 의존성 배열이 변경될 때마다  데이터 불러옴
  useEffect(() => {
    if (type === 'best') {
      handleLoad({ page, pageSize, orderBy });
    } else {
      handleLoad({ page, pageSize, keyword, order });
    }
  }, [page, pageSize, keyword, orderBy, order, handleLoad, type]);

  return { items, isLoadingError, totalCount };
}

export default useProducts;
