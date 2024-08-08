import { useEffect, useState } from "react";
import "./Best.css";
import { getProducts } from "../api";
import ItemForm from "./ItemForm";

function Best() {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(4);

  // 반응형 웹에 따른 항목 수 변경
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 743) {
        setPageSize(1); // mobile view
      } else if (width <= 1199) {
        setPageSize(2); // tablet view
      } else {
        setPageSize(4); // desktop view
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedItems = items.toSorted(
    (a, b) => b.favoriteCount - a.favoriteCount
  );

  const handleLoad = async (options) => {
    const { list } = await getProducts(options);
    setItems(list);
  };

  useEffect(() => {
    handleLoad({ orderBy: "favorite", page: 1, pageSize });
  }, [pageSize]);

  return (
    <div>
      <h1 className="Best-title">베스트 상품</h1>
      <ul className="Best-list">
        {sortedItems.map((item) => {
          return (
            <li key={item.id}>
              <ItemForm item={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Best;
