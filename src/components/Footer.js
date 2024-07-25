import React from "react";
import "../styles/Footer.css";

function Footer({ currentPage, totalPage, onChangePage }) {
  const handlePrevPage = () => {
    if (currentPage > 1) onChangePage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPage) onChangePage(currentPage + 1);
  };
  const handlePage = (page) => {
    onChangePage(page);
  };

  return (
    <div className="footer">
      <button className="page-button Text-lg Regular">&lt;</button>
      <button className="page-button Text-lg Regular">1</button>
      <button className="page-button Text-lg Regular">2</button>
      <button className="page-button Text-lg Regular">3</button>
      <button className="page-button Text-lg Regular">4</button>
      <button className="page-button Text-lg Regular">5</button>
      <button className="page-button Text-lg Regular">&gt;</button>
    </div>
  );
}

export default Footer;
