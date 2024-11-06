import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/productApi";
import { throttle } from "@/utils/throttle";
import { useState, useEffect } from "react";
import { Product } from "@/types/Types";

// FetchProductsResponse 타입 정의
interface FetchProductsResponse {
  list: Product[];
  totalCount: number;
}

interface UseProductsReturn {
  products: Product[];
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: unknown;
  handlePageChange: (newPage: number) => void;
  handleSortChange: (newSortOrder: string) => void;
  handleKeywordSearch: (newKeyword: string) => void;
}

export const useProducts = (
  initialProducts: Product[],
  initialTotalCount: number,
  initialItemsPerPage: number = 10
): UseProductsReturn => {
  // 상태 변수 타입 지정
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [keyword, setKeyword] = useState<string>("");

  // useQuery에서 FetchProductsResponse를 타입으로 지정
  const { data, error, isLoading } = useQuery<FetchProductsResponse>({
    queryKey: ["products", currentPage, itemsPerPage, orderBy, keyword],
    queryFn: async () => {
      const fetchedProducts = await fetchProducts({
        pageSize: itemsPerPage,
        page: currentPage,
        keyword,
        orderBy,
      });

      // 데이터 가공: FetchProductsResponse 형태로 가공하여 반환
      return {
        list: fetchedProducts,
        totalCount: fetchedProducts.length, // 또는 서버에서 반환한 적절한 totalCount 값을 사용합니다.
      };
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialData: {
      list: initialProducts,
      totalCount: initialTotalCount,
    },
  });

  // 총 페이지 수 계산 함수 타입 지정
  const calculateTotalPages = (
    totalCount: number,
    itemsPerPage: number
  ): number => {
    return Math.ceil(totalCount / itemsPerPage);
  };

  // 페이지 변경 함수 타입 지정
  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  // 정렬 방식 변경 함수 타입 지정
  const handleSortChange = (newSortOrder: string): void => {
    setOrderBy(newSortOrder);
    setCurrentPage(1);
  };

  // 키워드 검색 함수 타입 지정
  const handleKeywordSearch = (newKeyword: string): void => {
    setKeyword(newKeyword);
    setCurrentPage(1);
  };

  // 화면 크기에 따른 아이템 수 조정 함수 타입 지정
  const updateItemsPerPage = (): void => {
    const screenWidth = window.innerWidth;
    let newItemsPerPage: number;

    if (screenWidth <= 743) {
      newItemsPerPage = 4;
    } else if (screenWidth <= 1199) {
      newItemsPerPage = 6;
    } else {
      newItemsPerPage = 10;
    }

    setItemsPerPage(newItemsPerPage);
  };

  // 쓰로틀링을 사용하여 리사이즈 이벤트를 제어합니다.
  const throttledUpdateItemsPerPage = throttle(updateItemsPerPage, 200);

  // 초기 로드 및 리사이즈 이벤트 설정
  useEffect(() => {
    throttledUpdateItemsPerPage();
    window.addEventListener("resize", throttledUpdateItemsPerPage);

    return () => {
      window.removeEventListener("resize", throttledUpdateItemsPerPage);
    };
  }, []);

  return {
    products: data?.list || [],
    totalCount: data?.totalCount || 0,
    itemsPerPage,
    currentPage,
    totalPages: calculateTotalPages(data?.totalCount || 0, itemsPerPage),
    loading: isLoading,
    error,
    handlePageChange,
    handleSortChange,
    handleKeywordSearch,
  };
};
