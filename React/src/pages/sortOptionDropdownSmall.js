import React, { useState } from "react";
import "../assets/styles/App.css";
import arrow from "../assets/images/ic_sort.png";

function SortingOptionBoxSmall({ onChange, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    onChange(option);
    setIsOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="dropdown">
      <li className="dropdown-toggle small" onClick={toggleDropdown}>
        <img src={arrow} alt="arrow" />
      </li>
      {isOpen && (
        <ul className={`dropdown-menu-small ${isOpen ? "show" : ""}`}>
          <li onClick={() => selectOption("recent")}>최신순</li>
          <li onClick={() => selectOption("favorite")}>좋아요순</li>
        </ul>
      )}
    </div>
  );
}

export default SortingOptionBoxSmall;
