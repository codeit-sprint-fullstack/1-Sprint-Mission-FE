import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from './ProductCard';
import './ProductList.css';

export default function BestProducts({ className }) {
  const [products, setProducts] = useState([]);

  const classNames = `ProductList ${className}`;

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
    handleLoad({ orderBy: 'favorite', pageSize: 4 });
  }, []);

  return (
    <>
      <h2>베스트 상품</h2>

      <ul className={classNames}>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
