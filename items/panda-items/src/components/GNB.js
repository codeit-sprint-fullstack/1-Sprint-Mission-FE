import React from "react";
import "../assets/styles/App.css";
import bannerLogo from "../assets/images/logos.png";
import bannerLogo2 from "../assets/images/lilLogo.svg";
import userLogo from "../assets/images/userBasicLogo.png";

function GNB() {
  return (
    <div className="Header">
      <div className="Header-Wrapper">
        <div className="Header-Logo">
          <img src={bannerLogo} alt="Header_Logo"></img>
        </div>
        <div className="Header-Logo2">
          <img src={bannerLogo2} alt=""></img>
        </div>
        <div className="Header-Text">
          <div>자유게시판</div>
          <div>중고마켓</div>
        </div>
        <img src={userLogo} alt="" className="header-userprofile"></img>
      </div>
    </div>
  );
}

export default GNB;
