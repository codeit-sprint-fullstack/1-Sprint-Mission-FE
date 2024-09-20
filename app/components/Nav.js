"use client";

import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

import style from "./nav.module.css";

export function NavItem({ linkto, children }) {
  const pathname = usePathname();

  let navTextClass = classNames("text-gray-600");

  if (pathname.includes(linkto)) {
    navTextClass = classNames("text-blue-100");
  }

  const navItemClass = classNames(
    "box-border",
    "flex",
    "flex-row",
    "w-pc-nav-item",
    "h-pc-nav-item",
    "leading-26",
    "items-center",
    "justify-center",
    "font-bold",
    "text-nowrap",
    "text-2lg",
    "cursor-pointer",
    "mobile:w-mobile-nav-item",
    "mobile:text-lg",
    style.item
  );

  return (
    <li className={navItemClass}>
      <Link className={navTextClass} href={linkto} target="_self">
        {children}
      </Link>
    </li>
  );
}

export function Nav({ children }) {
  const navClass = classNames("flex", "flex-row", "w-full", "h-nav");
  const navUlClass = classNames("flex", "flex-row");

  return (
    <nav className={navClass}>
      <ul className={navUlClass}>{children}</ul>
    </nav>
  );
}
