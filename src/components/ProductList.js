import styles from './ProductList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

function ProductBestItem({ item }) {
  const Price = item.price;
  const formattedPrice = Price.toLocaleString('en-US');

  return (
    <div className={styles.ListItem}>
      <img className={styles.ItemImg} src={item.images} alt={item.name} />
      <div>
        <p className={styles.productListName}>{item.name}</p>
        <h1 className={styles.productListPrice}> {formattedPrice}</h1>
        <div className={styles.productListFavorite}>
          <FontAwesomeIcon className='favorite-icon' icon={faHeart} />
          <p className={styles.productListFavoriteCount}>
            {item.favoriteCount}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductList({ items }) {
  return (
    <>
      <div className={styles.ListItems}>
        {items.map((item) => (
          <ProductBestItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
