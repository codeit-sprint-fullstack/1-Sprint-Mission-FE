import Link from "next/link";
import classNames from "classnames";

import { Nav, NavItem } from "@/app/components/Nav";
import { HeaderUser } from "./HeaderUser";

import style from "./header.module.css";

export function Header() {
  const headerClass = classNames(
    "top-0",
    "fixed",
    "flex",
    "flex-row",
    "flex-nowrap",
    "items-center",
    "mt-0",
    "mx-auto",
    "w-full",
    "h-header",
    "bg-white",
    "border-b-1",
    "border-b-alto",
    "z-50",
    "pl-pc-header",
    "pr-pc-header",
    "tablet:pl-tablet-header",
    "tablet:pr-tablet-header",
    "mobile:pl-mobile-header",
    "mobile:pr-mobile-header",
    style.header
  );
  const btnHomeFrame = classNames(
    "mr-3.2rem",
    "tablet:mr-2rem",
    "mobile:mr-1.6rem"
  );
  const btnHome = classNames(
    "object-cover",
    "w-pc-btn-home",
    "h-pc-btn-home",
    "mobile:w-mobile-btn-home",
    "mobile:h-mobile-btn-home",
    style["btn-home"]
  );

  return (
    <div className={headerClass}>
      <Link className={btnHomeFrame} href="/" target="_self">
        <button className={btnHome} />
      </Link>
      <Nav>
        <NavItem linkto="/bulletin-board">자유게시판</NavItem>
        <NavItem linkto="/flea-market">중고마켓</NavItem>
      </Nav>
      <HeaderUser />
    </div>
  );
}

export default Header;
