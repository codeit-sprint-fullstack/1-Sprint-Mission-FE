import React, { useState } from "react";
import "../assets/styles/App.css";
import arrow from "../assets/images/upsideArrow.png";

function SortingOptionBox({ onChange, selectedOption, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    onChange(option);
    setIsOpen(false);
    setCurrentPage(1);
  };

  const innerText = selectedOption === "recent" ? "최신순" : "좋아요순";

  return (
    <div className="dropdown">
      <li className="dropdown-toggle" onClick={toggleDropdown}>
        {innerText}{" "}
        <img
          className={`arrow ${isOpen ? "up" : ""}`}
          src={arrow}
          alt="arrow"
        />
      </li>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => selectOption("recent")}>최신순</li>
          <li onClick={() => selectOption("favorite")}>좋아요순</li>
        </ul>
      )}
    </div>
  );
}

export default SortingOptionBox;
