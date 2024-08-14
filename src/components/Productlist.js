import "../css/products.css";
import icHeart from "../image/ic_heart.png";
import imgDefault from "../image/img_default.png";

function Product({ itemValues, favorite }) {
  const { images, name, price, favoriteCount } = itemValues;
  const numFormat = price.toLocaleString();
  return (
    <div className={favorite ? "favorite_product_item" : "product_item"}>
      <img className="nomal" src={imgDefault} alt="상품이미지"></img>
      <p className="name">{name}</p>
      <p className="price">{`${numFormat}원`}</p>
      <div className="favorite_container">
        <img className="favorite_icon" src={icHeart} alt="좋아요이미지"></img>
        <p className="favorite_count">{favoriteCount}</p>
      </div>
    </div>
  );
}

function ProductList({ items, favorite }) {
  return (
    <div className={favorite ? "best_Products" : "Products"}>
      {items.map((item) => (
        <Product key={item._id} itemValues={item} favorite={favorite} />
      ))}
    </div>
  );
}

export default ProductList;
