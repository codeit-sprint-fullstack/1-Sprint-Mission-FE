import Wrapper from '../components/Wrapper';
import ProductList from '../components/ProductList';
import BestProductList from '../components/BestProductList';
import './ProductPage.css';

function ProductPage() {
  return (
    <Wrapper className='Wrapper'>
      <BestProductList className='best-products' />
      <ProductList className='recent-products' />
    </Wrapper>
  );
}

export default ProductPage;
