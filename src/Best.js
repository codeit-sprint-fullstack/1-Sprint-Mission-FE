import { BestProduct } from "./Product";

export function BestList() {
  return (
    <div className="best">
      <p className="fontStyle">베스트 상품</p>
      <div className="bestProductList">
        <BestProduct />
      </div>
    </div>
  );
}
