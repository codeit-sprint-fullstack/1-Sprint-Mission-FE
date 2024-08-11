import "./ItemForm.css";
import defaultImg from '../image/defaultImg.png';

function ItemForm({ item = {} }) {
  const thousandPrice = item.price
    ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "0";

  const ImageWithDefault = item.image ? item.image : defaultImg;

  return (
    <div className="ItemForm">
      <img className="ItemForm-img" src={ImageWithDefault} alt={item.name} />
      <p className="Item-name">{item.name}</p>
      <h1>{thousandPrice}원</h1>
      <div className="like">
        <p>♡</p>
        <p>{item.favoriteCount}</p>
      </div>
    </div>
  );
}

export default ItemForm;
