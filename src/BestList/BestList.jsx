import { useEffect, useState } from "react";
import { useFetchProducts } from "../Product/useFetchProducts";
import "./BestList.css";

export function BestList() {
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth));
  function getPageSize(width) {
    if (width < 743) return 1; // Mobile
    if (width < 1199) return 2; // Tablet
    return 4; // Desktop
  }

  useEffect(() => {
    function handleResize() {
      setPageSize(getPageSize(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Product.js에서 API GET (favorite 기준 정렬)
  const { products, loading } = useFetchProducts({
    orderBy: "favorite",
    pageSize: pageSize,
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="best">
      <p className="fontStyle">베스트 상품</p>
      <div className="bestProductList">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((item) => (
            <div key={item.id} className="bestProductItem">
              <img
                className="bestProduct"
                src={item?.images?.[0] ?? "No image"}
                alt={item.name ?? "Product image"}
              />
              <p className="itemName">{item.name ?? "No name"}</p>
              <p className="itemPrice">
                {item.price ? `${formatPrice(item.price)} 원` : "No price"}
              </p>
              <p className="itemFavoriteCnt">♡ {item.favoriteCount ?? "0"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
