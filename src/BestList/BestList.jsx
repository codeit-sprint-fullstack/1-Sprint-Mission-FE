import { useEffect, useState } from "react";
import { useFetchProducts } from "../Product/useFetchProducts";
import { formatPrice } from "../common/Util";
import { useDeviceType } from "../common/usePageSize";
import "./BestList.css";

export function BestList() {
  const deviceType = useDeviceType();

  // Product.js에서 API GET (favorite 기준 정렬)
  const { products, loading } = useFetchProducts({
    orderBy: "favorite",
    pageSize: deviceType === "mobile" ? 1 : deviceType === "tablet" ? 2 : 4,
  });

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
