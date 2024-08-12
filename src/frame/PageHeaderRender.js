import React from "react";
import { Link } from "react-router-dom";
import "./PageHeaderRender.css";

// 리소스
import logoImg from "../images/logo.svg";
import logoSmallImg from "../images/logo_small.svg";
import profileImge from "../images/profile.svg";

//컴포넌트
import HeaderLoginBtn from "../components/HeaderLoginBtn";
import HeaderBoardList from "../components/HeaderBoardList";

function HomepageRenderHeader({
  loginStatus = false,
  freeBoardActive = false,
  marketBoardActive = false,
  device = "PC",
}) {
  return (
    <section className="headerContain">
        {device !== "Mobile" ? (
          <Link to="/">
            <img src={logoImg} alt="판다마켓" className="logoImg" />
          </Link>
        ) : (
          <Link to="/">
            <img src={logoSmallImg} alt="판다마켓" className="logoImg" />
          </Link>
        )}
      <HeaderBoardList
        freeBoardActive={freeBoardActive}
        marketBoardActive={marketBoardActive}
      />
      {loginStatus ? (
        <img src={profileImge} alt="프로필" className="profileImg" />
      ) : (
        <HeaderLoginBtn />
      )}
    </section>
  );
}

export default HomepageRenderHeader;
