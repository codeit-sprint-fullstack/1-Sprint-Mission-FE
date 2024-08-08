import Wrapper from '../components/Wrapper/Wrapper';
import ProductSection from '../components/ProductSection/ProductSection';
import useMediaQuery from '../hooks/useMediaQuery';
import './ProductPage.css';

function ProductPage() {
  const isTabletSize = useMediaQuery('tabletSize');
  const isMobileSize = useMediaQuery('mobileSize');

  return (
    <main>
      <Wrapper className='Wrapper'>
        <ProductSection
          className='ProductSection'
          isTabletSize={isTabletSize}
          isMobileSize={isMobileSize}
        />
      </Wrapper>
    </main>
  );
}

export default ProductPage;
