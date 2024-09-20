import Link from "next/link";

import { Nav, NavItem } from "@/app/components/Nav";
import Profile from "@/app/components/Profile";
import { PROFILE_H40 } from "../constants/Profile";

import style from "@/app/components/header.module.css";

export function Header() {
  const tempIsSignin = false;

  const handleProfileClick = () => {
    alert("아직 구현되지 않은 기능입니다");
  };

  const handleLoginBtnClick = () => {};

  return (
    <div className={style.header}>
      {/* <a className={btn-home-frame" href="/" target="_self">
        <span>
          <img className={img-home" alt="홈 버튼" />
        </span>
      </a> */}
      <Link className={style["btn-home-frame"]} href="/" target="_self">
        <button className={style["btn-home"]} />
      </Link>
      <Nav>
        <NavItem linkto="/bulletin-board">자유게시판</NavItem>
        <NavItem linkto="/flea-market">중고마켓</NavItem>
      </Nav>
      <div className={style["profile-frame"]}>
        {tempIsSignin ? (
          <Profile type={PROFILE_H40} onClick={handleProfileClick} />
        ) : (
          <Link
            className={style["btn-login-frame"]}
            href="/login"
            target="_self"
          >
            <div>
              <img className={style["img-login"]} alt="로그인 버튼" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
