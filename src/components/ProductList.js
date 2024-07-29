import heartIcon from '../assets/ic_heart.svg';
import './ProductList.css';

function ProductCard({ product }) {
  const imgUrl = product?.images?.[0] || 'default-image-url';
  return (
    <div className='ProductCard'>
      <img src={imgUrl} alt={product.name} className='card-image' />
      <div className='card-text'>
        <h3>{product.name}</h3>
        <p>{product.price.toLocaleString()}원</p>
        <div className='favorite-container'>
          <img src={heartIcon} alt='Favorite icon' />
          <span>{product.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}

export function ProductList({ products, className }) {
  const classNames = `ProductList ${className}`;
  return (
    <ul className={classNames}>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
}
