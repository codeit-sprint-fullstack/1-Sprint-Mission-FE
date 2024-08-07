import styles from './ProductList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

function ProductListItem({ item }) {
  const price = item.price;
  const formattedPrice = price.toLocaleString('en-US');

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
          <ProductListItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
