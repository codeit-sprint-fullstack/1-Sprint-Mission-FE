import Wrapper from '../components/Wrapper/Wrapper';
import ProductSection from '../components/ProductSection/ProductSection';
import BestSection from '../components/BestSection/BestSection';
import useMediaQuery from '../hooks/useMediaQuery';
import './ProductPage.css';

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
