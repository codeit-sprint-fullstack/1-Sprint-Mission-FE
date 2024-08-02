import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProducts = (sortOrder, page, pageSize, productSearch) => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://panda-market-api.vercel.app/products', {
          params: {
            orderBy: sortOrder,
            page,
            pageSize,
            keyword: productSearch,
          },
        });
        setProducts(response.data.list);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [sortOrder, page, pageSize, productSearch]);

  useEffect(() => {
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
  }, []);

  return { products, bestProducts };
};

export default useFetchProducts;

