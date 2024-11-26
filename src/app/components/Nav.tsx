"use client";

import { ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

interface NavItemProps {
  linkto: string;
  children: ReactNode;
}

export function NavItem({ linkto, children }: NavItemProps) {
  const pathname = usePathname();

  let navTextClass = classNames("text-gray-600");

  if (pathname.includes(linkto)) {
    navTextClass = classNames("text-blue-100");
  }

  const navItemClass = classNames(
    "box-border",
    "flex",
    "flex-row",
    "w-[10.9rem]",
    "leading-26",
    "items-center",
    "justify-center",
    "font-bold",
    "text-nowrap",
    "text-2lg",
    "cursor-pointer",
    "mo:w-[7rem]",
    "mo:text-lg",
    "hover:border-b-2",
    "hover:border-blue-100"
  );

  return (
    <li className={navItemClass}>
      <Link className={navTextClass} href={linkto} target="_self">
        {children}
      </Link>
    </li>
  );
}

interface NavProps {
  children: ReactNode;
}

export function Nav({ children }: NavProps) {
  const navClass = classNames("flex", "flex-row", "flex-grow", "h-full");
  const navUlClass = classNames("flex", "flex-row");

  return (
    <nav className={navClass}>
      <ul className={navUlClass}>{children}</ul>
    </nav>
  );
}
