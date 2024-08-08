import { Children } from 'react';

export function ItemsTextBox({ Children }) {
  return <div className="title">{Children}</div>;
}

export function Items({ item }) {
  return (
    <div className="item-box">
      <img className="item-img" src={item.images} alt={item.name} />
      <div className="item-name">{item.name}</div>
      <div className="item-price">{item.price}원</div>
      <div className="item-favorite-count">
        <div className="favorite" />
        {item.favoriteCount}
      </div>
    </div>
  );
}

export function ItemList({ items }) {
  return (
    <div className="grid-box">
      {items.map((item) => {
        return <Items key={item.id} item={item}></Items>;
      })}
    </div>
  );
}

export function SearchInput({ onChange }) {
  return (
    <input
      type="text"
      className="search"
      name="search"
      placeholder="검색할 상품을 입력해주세요"
      onChange={onChange}
      autoComplete="on"
    ></input>
  );
}
