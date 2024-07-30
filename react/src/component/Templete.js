import { Children } from 'react';

export function ItemsTextBox({ Children }) {
  return <div className="title">{Children}</div>;
}

export function Items({ item }) {
  return (
    <div className="itemBox">
      <img className="itemImg" src={item.images} alt={item.name} />
      <div className="itemName">{item.name}</div>
      <div className="itemPrice">{item.price}원</div>
      <div className="itemFavoriteCount">
        <div className="favorite" />
        {item.favoriteCount}
      </div>
    </div>
  );
}

export function ItemList({ items }) {
  return (
    <div className="gridBox">
      {items.map((item) => {
        return <Items key={item.id} item={item}></Items>;
      })}
    </div>
  );
}
