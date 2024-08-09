import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProducts = (sortOrder, page, pageSize, productSearch, isMarketPage = false) => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;

        if (isMarketPage) {
          // 중고마켓 페이지인 경우 로컬 백엔드 API 호출
          response = await axios.get('/api/products', {
            params: {
              orderBy: sortOrder,
              page,
              pageSize,
              keyword: productSearch,
            },
          });
        } else {
          // 초기 렌더링인 경우 원격 API 호출
          response = await axios.get('https://panda-market-api.vercel.app/products', {
            params: {
              orderBy: sortOrder,
              page,
              pageSize,
              keyword: productSearch,
            },
          });
        }

        setProducts(response.data.list);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [sortOrder, page, pageSize, productSearch, isMarketPage]);

  useEffect(() => {
    if (!isMarketPage) {
      // 초기 렌더링인 경우에만 베스트 상품 로드
      const fetchBestProducts = async () => {
        try {
          const response = await axios.get('https://panda-market-api.vercel.app/products', {
            params: {
              orderBy: 'favorite',
            },
          });
          setBestProducts(response.data.list);
        } catch (error) {
          console.error('Error fetching best products:', error);
        }
      };

      fetchBestProducts();
    }
  }, [isMarketPage]);

  return { products, bestProducts };
};

export default useFetchProducts;


