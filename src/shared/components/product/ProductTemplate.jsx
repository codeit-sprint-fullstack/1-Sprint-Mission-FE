import Image from 'next/image';
import styles from '@shared/components/product/ProductTemplate.module.css';
import classNames from 'classnames';

export default function ProductTemplate({ product, option }) {
  const TemplateStyle = classNames({
    [styles['product-container']]: true,
    [styles[option]]: option,
  });
  return (
    <>
      <div className={TemplateStyle}>
        <div className={styles['product-image']}>
          <Image src={product.images} fill />
        </div>
        <div className={styles['product-info']}>
          <div className={styles['product-name']}>{product.name}</div>
          <div className={styles['product-price']}>{product.price}원</div>
          <div className={styles['product-favorite']}>
            <div className={styles['product-favorite-image']}>
              <Image src={'/favorite.svg'} fill />
            </div>
            {product.favoriteCount}
          </div>
        </div>
      </div>
    </>
  );
}
