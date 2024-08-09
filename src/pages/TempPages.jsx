import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import './TempPages.css';
import Wrapper from '../components/Wrapper/Wrapper';
import { ProductCard } from '../components/ProductList/ProductList';

//register 확인용 상세페이지
export function TempProductDetailPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const init = useCallback(async () => {
    try {
      const result = await getProductById(id);
      console.log(result);

      setProduct(result);
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [id]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <main>
      <Wrapper>
        <h1>상세 페이지</h1>
        {product && (
          <>
            <ProductCard product={product} />
            <p>Description: {product.description}</p>
            <p>Tags: {product.tags.join(', ')}</p>
          </>
        )}
      </Wrapper>
    </main>
  );
}

export function TempHome() {
  return (
    <main>
      <Wrapper>
        <h1>Temporary Home page</h1>
      </Wrapper>
    </main>
  );
}

export function TempForums() {
  return (
    <main>
      <Wrapper>
        <h1>Temporary Forum page</h1>
      </Wrapper>
    </main>
  );
}
