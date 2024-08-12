import React, { useMemo } from "react";
import "assets/styles/App.css";
import bannerLogo from "assets/images/logo.png";
import bannerLogo2 from "assets/images/logo-small.svg";
import userLogo from "assets/images/user-basic-profile.png";
import { Link, useLocation } from "react-router-dom";

function GNB() {
  const location = useLocation();
  const currentPath = location.pathname;

  const currentPageHighlight = useMemo(() => {
    return (path) => {
      return currentPath === path ? { color: "#3692FF" } : { color: "#4B5563" };
    };
  }, [currentPath]);

  const headerContent = useMemo(
    () => (
      <>
        <Link to="/" className="header-logo">
          <img src={bannerLogo} alt="Header_Logo" />
        </Link>
        <Link to="/" className="header-logo2">
          <img src={bannerLogo2} alt="" />
        </Link>
        <div className="header-text">
          <Link
            to="/community"
            style={{
              textDecoration: "none",
              ...currentPageHighlight("/community"),
            }}
          >
            <div>자유게시판</div>
          </Link>
          <Link
            to="/items"
            style={{
              textDecoration: "none",
              ...currentPageHighlight("/items"),
            }}
          >
            <div>중고마켓</div>
          </Link>
        </div>
        <img src={userLogo} alt="" className="header-userprofile" />
      </>
    ),
    [currentPageHighlight]
  );

  return (
    <div className="header">
      <div className="header-wrapper">{headerContent}</div>
    </div>
  );
}

export default GNB;
