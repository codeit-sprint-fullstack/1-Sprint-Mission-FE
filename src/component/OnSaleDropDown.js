import { useState } from "react";
import "./OnSaleDropDown.css";
import dropDownIcon from "../image/dropDownArrow.png";

const DropDown = ({ selectRecent, selectFavorite }) => {
  const [dropDown, setDropDown] = useState(false);
  const [selectOrder, setSelectOrder] = useState("최신순");

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleSelectOrder = (order) => {
    setSelectOrder(order);
    order === "최신순" ? selectRecent() : selectFavorite();
    setDropDown(false);
  };

  const handleSelectRecent = () => handleSelectOrder("최신순");
  const handleSelectFavorite = () => handleSelectOrder("좋아요순");

  return (
    <div className="DropDownContainer">
      <button className="DropDownButton" onClick={toggleDropDown}>
        <span>{selectOrder}</span>
        <img className="dropDownIcon" src={dropDownIcon} alt="dropDownIcon" />
      </button>
      {dropDown && (
        <div className="DropDownList">
          <a onClick={handleSelectRecent}>최신순</a>
          <a onClick={handleSelectFavorite}>좋아요순</a>
        </div>
      )}
    </div>
  );
};

export default DropDown;
