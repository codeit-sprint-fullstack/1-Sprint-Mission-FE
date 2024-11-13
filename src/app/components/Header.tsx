import Link from "next/link";
import classNames from "classnames";

import { Nav, NavItem } from "./Nav";
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
    "ta:pl-ta-header",
    "ta:pr-ta-header",
    "mo:pl-mo-header",
    "mo:pr-mo-header",
    style.header
  );
  const btnHomeFrame = classNames("mr-3.2rem", "ta:mr-2rem", "mo:mr-1.6rem");
  const btnHome = classNames(
    "object-cover",
    "w-pc-btn-home",
    "h-pc-btn-home",
    "mo:w-mo-btn-home",
    "mo:h-mo-btn-home",
    style["btn-home"]
  );

  return (
    <div className={headerClass}>
      <Link className={btnHomeFrame} href="/" target="_self">
        <button className={btnHome} />
      </Link>
      <Nav>
        <NavItem linkto="/bulletin-board">자유게시판</NavItem>
        <NavItem linkto="/items">중고마켓</NavItem>
      </Nav>
      <HeaderUser />
    </div>
  );
}

export default Header;
