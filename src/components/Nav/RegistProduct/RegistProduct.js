import './registProduct.css';
import { Link } from 'react-router-dom';

function RegistProduct() {
  return (
    <Link to="registration" className="registProduct">
      상품 등록하기
    </Link>
  );
}

export default RegistProduct;
