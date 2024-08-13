import "./BestProduct.css";
import { useState, useEffect, useCallback } from "react";
import useResize from "./hook/useResize";
import ProductCard from "./ProductCard";
import { getapi } from "../api/api";
import useAsync from "./hook/useAsync";

function BestProduct() {
  const [items, setItems] = useState([]);
  const [lodingError, lodingErrorTag, apiAsync] = useAsync(getapi);
  const [pageSize, setPageSize] = useState(null);

  // 스크린 크기에 따른 이미지 갯수 변경
  const handleResize = useCallback(() => {
    const length = window.innerWidth;

    if (length >= 1200) {
      setPageSize(4);
    } else if (length < 1200 && length >= 768) {
      setPageSize(2);
    } else if (length >= 375 && length < 768) {
      setPageSize(1);
    }
  }, []);

  useResize(handleResize);

  //첫 랜더링 시 실행
  useEffect(() => {
    //getapi 호출
    const handleItemList = async (params) => {
      const result = await apiAsync(params);

      if (!result) {
        return;
      } else {
        const { list } = result;
        setItems(list);
      }
    };

    if (pageSize !== null) {
      handleItemList({ orderBy: "favorite", pageSize: pageSize });
    }
    
  }, [pageSize, apiAsync]);

  return (
    <>
      {lodingError?.message && <span>{lodingError.message}</span>}
      {lodingErrorTag || (
        <div className="ProductMobile">
          <div className="bestProductContaner">
            <h2 className="productFont bestProductFont">베스트 상품</h2>
            <ProductCard items={items} variant="best" />
          </div>
        </div>
      )}
    </>
  );
}

export default BestProduct;
