import Wrapper from '../components/Wrapper';
import ProductSection from '../components/ProductSection';
import BestSection from '../components/BestSection';
import './ProductPage.css';
import useMediaQuery from '../hooks/useMediaQuery';

function ProductPage() {
  const tabletSize = useMediaQuery('tabletSize');
  const mobileSize = useMediaQuery('mobileSize');

  return (
    <main>
      <Wrapper className='Wrapper'>
        <BestSection
          className='BestSection'
          tabletSize={tabletSize}
          mobileSize={mobileSize}
        />
        <ProductSection
          className='ProductSection'
          tabletSize={tabletSize}
          mobileSize={mobileSize}
        />
      </Wrapper>
    </main>
  );
}

export default ProductPage;
