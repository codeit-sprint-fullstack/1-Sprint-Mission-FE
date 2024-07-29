import { useEffect, useState } from "react";
import "./Best.css";
import { getProducts } from "../api";

function BestItem({ item }) {
  const thousandPrice = item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="BestItem">
      <img className="BestItem-img" src={item.images} alt={item.name} />
      <p>{item.name}</p>
      <h1>{thousandPrice}원</h1>
      <div className="like">
        <p>♡</p>
        <p>{item.favoriteCount}</p>
      </div>
    </div>
  );
}

function Best() {
  const [items, setItems] = useState([]);

  const sortedItems = items.toSorted(
    (a, b) => b.favoriteCount - a.favoriteCount
  );

  const handleLoad = async (options) => {
    const { list } = await getProducts(options);
    setItems(list);
  };

  useEffect(() => {
    handleLoad({ orderBy: "favorite", page: 1, pageSize: 4 });
  }, []);

  return (
    <div>
      <h1 className="Best-title">베스트 상품</h1>
      <ul className="Best-list">
        {sortedItems.map((item) => {
          return (
            <li key={item.id}>
              <BestItem item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Best;
