import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Nav from '../components/Nav';
import { getItemByName } from '../api';

function ProductDetailPage() {
  const { name } = useParams();
  getItemByName({ search: name });

  return (
    <>
      <Helmet>
        <title>상세 페이지</title>
      </Helmet>
      <div className="ProductDetailPage">
        <Nav />
        <div>
          <h1>{name}</h1>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
