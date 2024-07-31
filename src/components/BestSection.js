import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/api';

import './BestSection.css';

import ProductList from './ProductList';

export default function BestProducts({ className, tabletSize, mobileSize }) {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(() => {
    if (mobileSize) return 1;
    else if (tabletSize) return 2;
    return 4;
  });

  const init = useCallback(async () => {
    try {
      const result = await getProducts({ orderBy: 'favorite', pageSize });

      const { list } = result;
      setProducts(list);
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [pageSize]);

  useEffect(() => {
    if (mobileSize) setPageSize(1);
    else if (tabletSize) setPageSize(2);
    else setPageSize(4);
  }, [tabletSize, mobileSize]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <section className={className}>
      <h2>베스트 상품</h2>
      <ProductList products={products} />
    </section>
  );
}
