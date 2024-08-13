import './OrderChange.css'
import { useCallback, useState } from "react";
import useResize from "./hook/useResize";
import orderChangeArrow from "./img/orderChangeArrow.png";
import mobileOrderArrow from "./img/mobileOrderChangeArrow.png";

function OrderChange({ orderName, onClick }) {
  const [className, setClassName] = useState("orderBoxNone");
  const [orderArrow, setOrderArrow] = useState(null);

  const { orderChangeRecent, orderChangeFavorite } = onClick;

  const handleClassChange = () =>
    className === "orderBoxNone"
      ? setClassName("orderBox")
      : setClassName("orderBoxNone");

  //스크린 크기에 따른 이미지 변경
  const handleResize = useCallback(() => {
    const length = window.innerWidth;

    if (length >= 768) {
      setOrderArrow(orderChangeArrow);
    } else if (length >= 375 && length < 768) {
      setOrderArrow(mobileOrderArrow);
    }
  }, []);

  useResize(handleResize);

  return (
    <div className="orderChange">
      <div onClick={handleClassChange}>
        <p className="mobileOrderChange">{orderName}</p>
        <img className="orderArrow" src={orderArrow} alt="화살표" />
      </div>
      <div className={className}>
        <p className="orderRecent" onClick={orderChangeRecent}>
          최신순
        </p>
        <p className="orderLine" />
        <p className="orderFavorite" onClick={orderChangeFavorite}>
          좋아요순
        </p>
      </div>
    </div>
  );
}

export default OrderChange;
