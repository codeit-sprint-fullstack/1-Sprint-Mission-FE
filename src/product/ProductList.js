import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

function ProductBestItem({ item }) {
  const Price = item.price;
  const formattedPrice = Price.toLocaleString('en-US');

  return (
    <div className='product-item'>
      <img className='img' src={item.images} alt={item.name} />
      <div>
        <p className='name'>{item.name}</p>
        <h1 className='price'> {formattedPrice}</h1>
        <div className='favorite'>
          <FontAwesomeIcon className='favorite-icon' icon={faHeart} />
          <p className='favorite-count'>{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

function ProductList({ items }) {
  return (
    <div className='listImg'>
      {items.map((item) => (
        <ProductBestItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductList;
