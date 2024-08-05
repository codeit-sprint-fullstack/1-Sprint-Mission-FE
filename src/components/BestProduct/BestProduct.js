import './bestproduct.css';
import heartImg from '../../assets/images/ic_heart.png';
import { useEffect, useState } from 'react';
import { getProducts } from '../../assets/services/api.mjs';
import usePageSize from '../../hook/usePageSize';

function BestProduct() {
  const pageSize = usePageSize(4, 2, 1);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const products = await getProducts({ pageSize, page: 1 });
      setData(products);
    }
    fetchData();
  }, [pageSize]);

  return (
    <ul className="productLayout">
      {data.map(({ favoriteCount, id, description, images, price }) => {
        return (
          <li key={id} className="productContainer">
            <img src={images} alt={description} className="productImg" />
            <p className="itemDescription">{description}</p>
            <p className="itemPrice">{price.toLocaleString('en-US') + '원'}</p>
            <div className="favoriteBox">
              <img src={heartImg} alt={heartImg} className="heartImg" />
              <p className="itemFavoriteCount">{favoriteCount}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default BestProduct;
