import './sellproduct.css';
import heartImg from '../../assets/images/ic_heart.png';
import { useEffect, useState } from 'react';
import { getProducts, getTotalCount } from '../../assets/services/api.mjs';
import usePageSize from '../../hook/usePageSize';

function SellProduct({ currentPage, orderBy, searchQuery, setTotalCount }) {
  const pageSize = usePageSize(10, 6, 4);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const products = await getProducts({ pageSize, page: currentPage, orderBy, searchQuery });
      setData(products);
      const count = await getTotalCount(searchQuery);
      setTotalCount(count);
      console.log(count);
    }
    fetchData();
  }, [currentPage, orderBy, searchQuery, setTotalCount, pageSize]);

  return (
    <ul className="sellProductLayout">
      {data.map(({ favoriteCount, id, description, images, price, name }) => {
        return (
          <li key={id} className="sellProductContainer">
            <img src={images} alt={description} className="sellProductImg" />
            <p className="sellItemName">{name}</p>
            <p className="sellItemPrice">{price.toLocaleString('en-US') + '원'}</p>
            <div className="sellFavoriteBox">
              <img src={heartImg} alt={heartImg} className="heartImg" />
              <p className="sellItemFavoriteCount">{favoriteCount}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SellProduct;
