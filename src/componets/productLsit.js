import "../css/products.css";
import ic_heart from "../image/ic_heart.png";

function Product({ itemValues, favorite }) {
  const { images, name, price, favoriteCount } = itemValues;
  return (
    <div className={favorite ? "favorite_product_item" : "product_item"}>
      <img className="nomal" src={images} alt="상품이미지"></img>
      <p className="name">{name}</p>
      <p className="price">{`${price}원`}</p>
      <div className="favorite_container">
        <img className="favorite_icon" src={ic_heart} alt="좋아요이미지"></img>
        <p className="favorite_count">{favoriteCount}</p>
      </div>
    </div>
  );
}

function ProductList({ items, favorite }) {
  return (
    <div className={favorite ? "best_Products" : "Products"}>
      {items.map((item) => (
        <Product key={item.id} itemValues={item} favorite={favorite} />
      ))}
    </div>
  );
}

export default ProductList;
