import styles from './ProductBestList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

function ProductBestItem({ item }) {
  const Price = item.price;
  const formattedPrice = Price.toLocaleString('en-US');

  return (
    <div className={styles.productBestItem}>
      <img
        className={styles.productBestImg}
        src={item.images}
        alt={item.name}
      />
      <div className={styles.productBestText}>
        <p className={styles.productBestName}>{item.description}</p>
        <p className={styles.productBestPrice}> {formattedPrice}</p>
        <div className={styles.productBestfavorite}>
          <FontAwesomeIcon icon={faHeart} />
          <p className={styles.productBestfavoriteCount}>
            {item.favoriteCount}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductBestList({ items }) {
  return (
    <div className={styles.BestItem}>
      {items.map((item) => (
        <ProductBestItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductBestList;
