import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import './ProductList.css';
import ProductList from './ProductList';

export default function BestProducts({ className, tabletSize, mobileSize }) {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(0);

  const handleLoad = async (options) => {
    try {
      let result;
      result = await getProducts(options);
      if (result) {
        const { list } = result;
        setProducts(list);
      }
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  };

  useEffect(() => {
    if (mobileSize) setPageSize(1);
    else if (tabletSize) setPageSize(2);
    else setPageSize(4);
  }, [tabletSize, mobileSize]);

  useEffect(() => {
    handleLoad({ orderBy: 'favorite', pageSize });
  }, [pageSize]);

  return (
    <section>
      <h2>베스트 상품</h2>
      <ProductList className={className} products={products} />
    </section>
  );
}
