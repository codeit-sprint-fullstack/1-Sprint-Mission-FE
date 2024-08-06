import heartIcon from "./img/heartIcon.png";

// ProductCard의 내부 jsx
function ProductCardList({ item, variant }) {
  //글자 수 20 넘을 시
  let itemName;
  if (variant === "sale" && item.name.length >= 20) {
    itemName = `${item.name.slice(0, 19)}...`;
  } else {
    itemName = item.name;
  }

  return (
    <div>
      <img
        className={`${variant}ProductImg`}
        src={item.images[0]}
        alt={item.tags}
      />
      <div>
        <h3 className={`productName productColor ${variant}ProductName`}>
          {itemName}
        </h3>
        <p className="productPrice productColor">
          {item.price.toLocaleString("en-US")}
        </p>
        <div className="productFavoriteContaner">
          <img className="heartIcon" src={heartIcon} alt="하트 아이콘" />
          <p className="productFavoriteCount">{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ items, variant }) {
  return (
    <ol className={`${variant}ProductCardContaner`}>
      {items.map((item) => (
        <li className={`${variant}ProductCard`} key={item.id}>
          <ProductCardList item={item} variant={variant} />
        </li>
      ))}
    </ol>
  );
}

export default ProductCard;
