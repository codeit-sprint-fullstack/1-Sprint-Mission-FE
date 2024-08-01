import React from "react";
import "assets/styles/App.css";
import bannerLogo from "assets/images/logo.png";
import bannerLogo2 from "assets/images/logo-small.svg";
import userLogo from "assets/images/user-basic-profile.png";

function GNB() {
  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-logo">
          <img src={bannerLogo} alt="Header_Logo"></img>
        </div>
        <div className="header-logo2">
          <img src={bannerLogo2} alt=""></img>
        </div>
        <div className="header-text">
          <div>자유게시판</div>
          <div>중고마켓</div>
        </div>
        <img src={userLogo} alt="" className="header-userprofile"></img>
      </div>
    </div>
  );
}

export default GNB;
