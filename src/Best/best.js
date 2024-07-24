import { useFetchProducts } from "../Product/Product";
import "./Best.css";

export function BestList() {
  const { products, loading } = useFetchProducts({
    orderBy: "favorite",
    pageSize: 4,
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
                src={item.images[0] || "No image"}
                alt={item.name || "Product image"}
              />
              <p className="itemName">{item.name || "No name"}</p>
              <p className="itemPrice">
                {item.price ? `${formatPrice(item.price)} 원` : "No price"}
              </p>
              <p className="itemFavoriteCnt">
                ♡ {item.favoriteCount || "No likes"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
