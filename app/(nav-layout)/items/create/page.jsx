import CreateProduct from '@shared/components/product/createProduct';
import styles from '@app/(nav-layout)/items/create/page.module.css';

export default function CreateProductPage() {
  return (
    <div className={styles['container']}>
      <CreateProduct />
    </div>
  );
}
