import { useLocation } from "react-router-dom";

function DetailProduct() {
  const location = useLocation();
  const state = location.state || {};
  return (
    <main>
      <div>상세페이지</div>
      <p>{JSON.stringify(state)}</p>
    </main>
  );
}

export default DetailProduct;
