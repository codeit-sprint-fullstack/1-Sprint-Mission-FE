import ProductTemplate from '@shared/components/product/ProductTemplate';
import styles from '@app/(nav-layout)/items/page.module.css';
import { getProductList, getProductTotalCount } from '@utils/api/product';
import ProductToolbar from '@shared/components/product/ProductToolbar';
import ForSaleProduct from '@shared/components/product/ForSaleProduct';
import PaginationButton from '@shared/components/Buttons/PaginationButton';

export default async function Product() {
  const BestProduct = await getProductList({ limit: 4 });
  const productTotalCount = await getProductTotalCount();

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>베스트 상품</div>
      <div className={styles['best-product-container']}>
        {BestProduct.map((product) => {
          return <ProductTemplate product={product} option={'best'} />;
        })}
      </div>
      <div className={styles['toolbar-container']}>
        <div className={styles['title']}>판매 중인 상품</div>
        <ProductToolbar />
      </div>
      <div>
        <ForSaleProduct />
      </div>
      <PaginationButton data={productTotalCount} limit={10} />
    </div>
  );
}
