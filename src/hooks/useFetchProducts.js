import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProducts = (sortOrder, page, pageSize, productSearch, isMarketPage = false) => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        const baseUrl = isMarketPage 
          ? `${process.env.REACT_APP_API_URL}/products` 
          : 'https://panda-market-api.vercel.app/products';

        response = await axios.get(baseUrl, {
          params: {
            orderBy: sortOrder,
            page,
            pageSize,
            keyword: productSearch,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setProducts(response.data.list);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response) {
          console.error('Response data:', error.response.data); // 서버에서 반환한 오류 메시지 확인
        }
      }
    };

    fetchProducts();
  }, [sortOrder, page, pageSize, productSearch, isMarketPage]);

  useEffect(() => {
    if (!isMarketPage) {
      const fetchBestProducts = async () => {
        try {
          const response = await axios.get('https://panda-market-api.vercel.app/products', {
            params: { orderBy: 'favorite' },
            headers: { 'Content-Type': 'application/json' },
          });
          setBestProducts(response.data.list);
        } catch (error) {
          console.error('Error fetching best products:', error);
          if (error.response) {
            console.error('Response data:', error.response.data); // 서버에서 반환한 오류 메시지 확인
          }
        }
      };

      fetchBestProducts();
    }
  }, [isMarketPage]);

  return { products, bestProducts };
};

export default useFetchProducts;


