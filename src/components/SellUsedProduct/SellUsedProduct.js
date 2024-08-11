import './sellusedproduct.css';
import heartImg from '../../assets/images/ic_heart.png';
import { useEffect, useState } from 'react';
import { getDb } from '../../assets/services/api.mjs';
import usePageSize from '../../hook/usePageSize';
import defaultImg from '../../assets/images/img_default.png';

function SellUsedProduct({ currentPage, searchQuery, setTotalCount }) {
  const pageSize = usePageSize(10, 6, 4);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const products = await getDb({ limit: pageSize, sort: 'recent', offset: (currentPage - 1) * pageSize, searchQuery });
      setData(products);
      setTotalCount(40);
    }
    fetchData();
  }, [currentPage, searchQuery, setTotalCount, pageSize]);

  return (
    <ul className="sellProductLayout">
      {data.map(({ favoriteCount, id, description, price, name }) => {
        return (
          <li key={id} className="sellProductContainer">
            <img src={defaultImg} alt={description} className="sellProductImg" />
            <p className="sellItemName">{name}</p>
            <p className="sellItemPrice">{price.toLocaleString('en-US') + '원'}</p>
            <div className="sellFavoriteBox">
              <img src={heartImg} alt="heart icon" className="heartImg" />
              <p className="sellItemFavoriteCount">{favoriteCount}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SellUsedProduct;
