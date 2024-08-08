import "./ItemForm.css";

function ItemForm({ item = {} }) {
  const thousandPrice = item.price
    ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "0";

  return (
    <div className="ItemForm">
      <img className="ItemForm-img" src={item.images} alt={item.name} />
      <p>{item.name}</p>
      <h1>{thousandPrice}원</h1>
      <div className="like">
        <p>♡</p>
        <p>{item.favoriteCount}</p>
      </div>
    </div>
  );
}

export default ItemForm;
