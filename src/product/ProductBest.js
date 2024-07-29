import './ProductBest.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

function ProductBestItem({ item }) {
  const Price = item.price;
  const formattedPrice = Price.toLocaleString('en-US');

  return (
    <div className='product-best-item'>
      <img className='img' src={item.images} alt={item.name} />
      <div>
        <p className='bb'>{item.description}</p>
        <h1 className='price'> {formattedPrice}</h1>
        <div className='favorite'>
          <FontAwesomeIcon icon={faHeart} />
          <p className='favorite-count'>{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

function ProductBestList({ items }) {
  return (
    <div className='bestImg'>
      <p>베스트상품</p>
      <div className='BestItem'>
        {items.map((item) => (
          <ProductBestItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductBestList;
