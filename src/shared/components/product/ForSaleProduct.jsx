'use client';
import ProductTemplate from '@shared/components/product/ProductTemplate';
import styles from '@shared/components/product/ForSaleProduct.module.css';
import { useProductList } from '@hooks/product/useProductMutations';
import { useSearchProductStore } from '@shared/store/product/searchProduct';
import { usePaginationStore } from '@shared/store/pagination/pagination';

export default function ForSaleProduct() {
  const { search } = useSearchProductStore();
  const { page } = usePaginationStore();
  const { data, isLoading, error } = useProductList({ search, offset: page });

  if (isLoading) return <div>로딩중입니다.</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className={styles['container']}>
        {data.map((product) => {
          return <ProductTemplate product={product} />;
        })}
      </div>
    </>
  );
}
