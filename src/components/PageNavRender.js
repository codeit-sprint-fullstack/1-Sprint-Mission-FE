import React from "react";
import { Link } from "react-router-dom";
import "./PageNavRender.css";

// 리소스
import logoImg from "../images/logo.svg";
import logoSmallImg from "../images/logo_small.svg";
import profileImge from "../images/profile.svg";

//컴포넌트
import HeaderLoginBtn from "./common/HeaderLoginBtn";
import HeaderBoardList from "./common/HeaderBoardList";

function PageNavRender({
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

export default PageNavRender;
