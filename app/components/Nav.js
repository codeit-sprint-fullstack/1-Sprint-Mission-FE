"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import style from "@/app/components/nav.module.css";

export function NavItem({ linkto, children }) {
  const pathname = usePathname();

  let navTextClass = style["text"];

  if (pathname.includes(linkto)) {
    navTextClass = style["text-current-page"];
  }

  const navItemClass = `Bold ${style["item"]}`;

  return (
    <li className={navItemClass}>
      <Link className={navTextClass} href={linkto} target="_self">
        {children}
      </Link>
    </li>
  );
}

export function Nav({ children }) {
  const navClass = `flex-row ${style.nav}`;
  const navUlClass = style["list"];

  return (
    <nav className={navClass}>
      <ul className={navUlClass}>{children}</ul>
    </nav>
  );
}
