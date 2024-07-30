import { useEffect, useState } from "react";
import { useFetchProducts } from "../Product/useFetchProducts";
import "./BestList.css";

export function BestList() {
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth));
  function getPageSize(width) {
    // 브라우저 사이즈에 따른 pageSize 설정
    if (width < 743) return 1; // Mobile
    if (width < 1199) return 2; // Tablet
    return 4; // Desktop
  }

  useEffect(() => {
    function handleResize() {
      // 브라우저 사이즈 변경 함수 선언
      setPageSize(getPageSize(window.innerWidth)); // 현재 크기에 따른 페이지 사이즈 설정 함수 호출
    }
    window.addEventListener("resize", handleResize); // 크기 변경 이벤트 리스너 등록
    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트시 이벤트 리스너 제거
    };
  }, []);

  // Product.js에서 API GET (favorite 기준 정렬)
  const { products, loading } = useFetchProducts({
    orderBy: "favorite",
    pageSize: pageSize,
  });

  // 가격 천 단위로 포맷
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="best">
      <p className="fontStyle">베스트 상품</p>
      <div className="bestProductList">
        {products.length === 0 ? (
          <p>No products available</p> // 상품이 없을 때
        ) : (
          products.map(
            (
              item // 상품 배열 요소 가져오기
            ) => (
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
                <p className="itemFavoriteCnt">♡ {item.favoriteCount || "0"}</p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
